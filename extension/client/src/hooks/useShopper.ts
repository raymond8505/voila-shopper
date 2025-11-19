import { useCallback } from "react"
import { useVoila } from "./useVoila"
import { useJobManager } from "./useJobManager"
import type { Job, Voila } from "../types"
import { useWorkflow } from "./useWorkflow"

export function useShopper() {
	const { getProducts } = useVoila()
	const { fetchJob } = useJobManager()
	const { call: callRecommendationsWorkflow } = useWorkflow(
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

	const generateRecommendations = useCallback(() => {
		return callRecommendationsWorkflow({
			payload: {},
			responseType: "job",
		})
	}, [])

	return { getRecommendations, generateRecommendations }
}
