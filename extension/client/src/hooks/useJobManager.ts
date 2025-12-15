import { useCallback } from "react"
import { supabaseRequest } from "../api/supabase"
import { Job } from "../types"
import { useQueryClient } from "@tanstack/react-query"

export function useJobManager() {
	const queryClient = useQueryClient()

	const fetchJob = useCallback(
		<T>(id: Job.JobItem["id"], extraParams = {}): Promise<Job.JobItem<T>[]> => {
			return queryClient.fetchQuery({
				queryKey: ["fetch-job", id, extraParams],
				queryFn: async () => {
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
				},
			})
		},
		[queryClient]
	)

	const pollJobData = useCallback(
		async <T = Job.JobItem<Job.UnknownData>>(
			id: Job.JobItem["id"],
			resolveOnStatus: string,
			timeoutMs?: number
		): Promise<Job.JobItem<T> | undefined> => {
			return new Promise(async (resolve, reject) => {
				const start = new Date()

				async function checkJob() {
					const now = new Date()

					if (timeoutMs && now.getTime() - start.getTime() >= timeoutMs) {
						reject("TIMEOUT")
					} else {
						try {
							const job = await fetchJob(id, {
								status: `eq.${resolveOnStatus}`,
							})

							if (job?.[0]?.status === resolveOnStatus) {
								resolve(job[0] as Job.JobItem<T>)
							} else {
								setTimeout(checkJob, 5000)
							}
						} catch (e) {
							reject("JOB FETCH ERROR")
						}
					}
				}

				checkJob()
			})
		},
		[queryClient, fetchJob]
	)

	const getJobIds: () => Promise<
		Pick<Job.JobItem, "id" | "created_at" | "status">[]
	> = useCallback(async () => {
		return queryClient.fetchQuery({
			queryKey: ["get-job-ids"],
			queryFn: async () => {
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
			},
		})
	}, [queryClient])

	return { getJobIds, pollJobData, fetchJob }
}
