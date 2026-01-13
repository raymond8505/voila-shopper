import { useCallback, useState } from "react"
import { useVoila } from "./useVoila"

import type {
	RecommendationsWorkflowPayload,
	ShopperJob,
	TrimmedProduct,
	Voila,
	Workflow,
} from "../types/index"
import { useWorkflow } from "./useWorkflow"
import { getMinimalPrice } from "../helpers"
import { useStore } from "@store/client"
import { isWorkflowError } from "../types/helpers"

export function useShopper() {
	const { getProducts, getPromotionProducts } = useVoila()
	const { includeCriteria, excludeCriteria } = useStore()
	const [promosLoading, setPromosLoading] = useState(false)

	const {
		call: callRecommendationsWorkflow,
		loading: recommendationsLoading,
	} = useWorkflow<ShopperJob>({
		url: import.meta.env.VITE_WORKFLOW_RECOMMEND_PRODUCTS,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

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
			return (
				arr.findIndex((p) => p.productId === prod.productId) ===
				i
			)
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

				trimmedProduct["price"] =
					getMinimalPrice(decoratedProduct)

				return trimmedProduct
			}
		)

		const recommendations =
			await callRecommendationsWorkflow<RecommendationsWorkflowPayload>(
				{
					payload: {
						products: trimmedProducts,
						includeCriteria,
						excludeCriteria,
					},
					responseType: "job",
					hookOptions: {
						method: "POST",
					},
				}
			)

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
	}, [
		callRecommendationsWorkflow,
		getPromotionProducts,
		setPromosLoading,
	])

	return {
		generateRecommendations,
		recommendationsLoading:
			promosLoading || recommendationsLoading,
	}
}
