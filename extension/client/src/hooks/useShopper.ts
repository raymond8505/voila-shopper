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
			jobData.flatMap((job) =>
				job.products
					.filter((id) => id !== null)
					.filter((id, i) => job.products.indexOf(id) === i)
			)
		)

		console.log("Voila Products:", { voilaProducts, jobData })

		return voilaProducts.products
	}, [])

	return { getRecommendations }
}
