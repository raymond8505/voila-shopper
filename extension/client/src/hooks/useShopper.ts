import { useCallback, useState } from "react"
import { useVoila } from "./useVoila"
import { useJobManager } from "./useJobManager"
import type {
	Job,
	RecommendationsWorkflowPayload,
	TrimmedProduct,
	Voila,
	Workflow,
} from "../types/index"
import { useWorkflow } from "./useWorkflow"
import { getMinimalPrice } from "../helpers"
import { useStore } from "../store"
import { isWorkflowError } from "../types/guards"

export function useShopper() {
	const { getProducts, getPromotionProducts } = useVoila()
	const { includeCriteria, excludeCriteria } = useStore()
	const { fetchJob } = useJobManager()
	const [promosLoading, setPromosLoading] = useState(false)

	const { call: callRecommendationsWorkflow, loading: recommendationsLoading } =
		useWorkflow<Job.ShopperJob>(
			import.meta.env.VITE_WORKFLOW_RECOMMEND_PRODUCTS
		)

	const getRecommendations = useCallback(
		async (jobId: string) => {
			const jobData = await fetchJob<Job.ShopperJob>(jobId)

			const voilaProducts = await getProducts(
				jobData.flatMap((job) =>
					job.data.products
						.filter((id) => id !== null)
						.filter((id, i) => job.data.products.indexOf(id) === i)
				)
			)

			console.log("Voila Products:", { voilaProducts, jobData })

			return voilaProducts.products as Voila.Product[]
		},
		[fetchJob, getProducts]
	)

	const generateRecommendations: () => Promise<
		Workflow.Error | Voila.Product[]
	> = useCallback(async () => {
		const relevantFields = [
			"brand",
			"categoryPath",
			//"countryOfOrigin",
			//"favourite",
			"guaranteedProductLife",
			"name",
			"packSizeDescription",
			// "price",
			"productId",
			// "promoPrice",
			// "promoUnitPrice",
			// "unitPrice",
		]

		setPromosLoading(true)

		const promoProducts = (
			await getPromotionProducts(
				import.meta.env.VITE_RECOMMEND_PRODUCTS_BATCH_SIZE
			)
		).filter((prod, i, arr) => {
			return arr.findIndex((p) => p.productId === prod.productId) === i
		})

		setPromosLoading(false)

		const trimmedProducts: TrimmedProduct[] = promoProducts.map(
			(decoratedProduct) => {
				const trimmedProduct = {} as TrimmedProduct

				relevantFields.forEach((field) => {
					const val = decoratedProduct[field]

					if (val !== null && val !== undefined) {
						trimmedProduct[field] = val
					}
				})

				trimmedProduct["price"] = getMinimalPrice(decoratedProduct)

				return trimmedProduct
			}
		)

		const recommendations =
			await callRecommendationsWorkflow<RecommendationsWorkflowPayload>({
				payload: {
					products: trimmedProducts,
					includeCriteria,
					excludeCriteria,
				},
				responseType: "job",
				hookOptions: {
					method: "POST",
				},
			})

		if (!recommendations) {
			return [] as Voila.Product[]
		}

		if (isWorkflowError(recommendations)) {
			return recommendations
		} else {
			return recommendations?.products?.length
				? (await getProducts(recommendations?.products)).products
				: ([] as Voila.Product[])
		}
	}, [callRecommendationsWorkflow, getPromotionProducts, setPromosLoading])

	return {
		getRecommendations,
		generateRecommendations,
		recommendationsLoading: promosLoading || recommendationsLoading,
	}
}
