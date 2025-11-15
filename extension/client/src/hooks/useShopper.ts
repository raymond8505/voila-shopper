import { useCallback } from "react"
import { useVoila } from "./useVoila"
import { useJobManager } from "./useJobManager"
import type { Job } from "../types"

export function useShopper() {
	const { getProducts } = useVoila()
	const { getJobData } = useJobManager()

	const getRecommendations = useCallback(async (jobId: string) => {
		const jobData = await getJobData<Job.ShopperJob>(jobId)

		const voilaProducts = await getProducts(
			jobData.flatMap((job) => job.products.map((p) => p.productId))
		)

		console.log("Voila Products:", voilaProducts)

		return voilaProducts.products
	}, [])

	return { getRecommendations }
}
