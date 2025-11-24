import { useCallback } from "react"
import { supabaseRequest } from "../api/supabase"
import { Job } from "../types"

export function useJobManager() {
	async function fetchJobInner<T>(
		id: Job.JobItem["id"],
		extraParams = {}
	): Promise<Job.JobItem<T>[]> {
		const resp = await supabaseRequest({
			table: "jobs",
			tableParams: {
				select: "*",
				id: `eq.${id}`,
				...extraParams,
			},
		})

		const json = await resp.json()

		return json.map((item) => ({
			...item,
			data: JSON.parse(item.data),
		}))
	}

	const fetchJob = useCallback(fetchJobInner, [])

	const pollJobData = useCallback(
		async <T = Job.JobItem<Job.UnknownData>>(
			id: Job.JobItem["id"],
			resolveOnStatus: string
		): Promise<Job.JobItem<T> | undefined> => {
			return new Promise(async (resolve, reject) => {
				async function checkJob() {
					try {
						const job = await fetchJobInner(id, {
							status: `eq.${resolveOnStatus}`,
						})

						if (job?.[0]?.status === resolveOnStatus) {
							resolve(job[0] as Job.JobItem<T>)
						} else {
							setTimeout(checkJob, 5000)
						}
					} catch (e) {
						reject(undefined)
					}
				}

				checkJob()
			})
		},
		[]
	)

	const getJobIds: () => Promise<
		Pick<Job.JobItem, "id" | "created_at" | "status">[]
	> = useCallback(async () => {
		const resp = await supabaseRequest({
			table: "jobs",
			tableParams: {
				select: "id,created_at,status",
				order: `created_at.desc`,
			},
		})

		const json = await resp.json()

		return json.map((item) => ({
			id: item.id,
			created_at: new Date(item.created_at),
			status: item.status,
		}))
	}, [])

	return { getJobIds, pollJobData, fetchJob }
}
