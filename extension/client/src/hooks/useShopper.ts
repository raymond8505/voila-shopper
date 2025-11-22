import { useCallback } from "react"
import { useVoila } from "./useVoila"
import { useJobManager } from "./useJobManager"
import type { Job } from "../types"
import { useWorkflow } from "./useWorkflow"
import { getMinimalPrice } from "../helpers"

export function useShopper() {
	const { getProducts, getPromotionProducts } = useVoila()
	const { fetchJob } = useJobManager()
	const { call: callRecommendationsWorkflow, result: recommendationResult } =
		useWorkflow<Job.ShopperJob>(
			import.meta.env.VITE_WORKFLOW_RECOMMEND_PRODUCTS
		)

	const getRecommendations = useCallback(async (jobId: string) => {
		const jobData = await fetchJob<Job.ShopperJob>(jobId)

		const voilaProducts = await getProducts(
			jobData.flatMap((job) =>
				job.data.products
					.filter((id) => id !== null)
					.filter((id, i) => job.data.products.indexOf(id) === i)
			)
		)

		console.log("Voila Products:", { voilaProducts, jobData })

		return voilaProducts.products
	}, [])

	const generateRecommendations = useCallback(async () => {
		const relevantFields = [
			//"brand",
			"categoryPath",
			//"countryOfOrigin",
			//"favourite",
			"guaranteedProductLife",
			"name",
			"packSizeDescription",
			// "price",
			// "productId",
			// "promoPrice",
			// "promoUnitPrice",
			// "unitPrice",
		]
		const promoProducts = (await getPromotionProducts()).filter(
			(prod, i, arr) => {
				return arr.findIndex((p) => p.productId === prod.productId) === i
			}
		)

		console.log({ promoProducts })

		await callRecommendationsWorkflow({
			payload: {
				products: promoProducts.map((decoratedProduct) => {
					const trimmedProduct = {}

					relevantFields.forEach((field) => {
						const val = decoratedProduct[field]

						if (val !== null && val !== undefined) {
							trimmedProduct[field] = val
						}
					})

					trimmedProduct["price"] = getMinimalPrice(decoratedProduct)

					return trimmedProduct
				}),
			},
			responseType: "job",
			hookOptions: {
				method: "POST",
			},
		})

		return recommendationResult?.products?.length
			? (await getProducts(recommendationResult.products)).products
			: []
	}, [recommendationResult, callRecommendationsWorkflow, getPromotionProducts])

	return { getRecommendations, generateRecommendations }
}
