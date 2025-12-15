import { useCallback } from "react"
import { supabaseRequest } from "../api/supabase"
import { Job } from "../types"
import { useQueryClient } from "@tanstack/react-query"
import { rejects } from "assert"

const JOB_POLL_INTERVAL_MS = 5000
const DEFAULT_JOB_TIMEOUT_MS = 1000 * 60 * 15 // 15 minutes
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
			timeoutMs: number = DEFAULT_JOB_TIMEOUT_MS
		): Promise<Job.JobItem<T> | undefined> => {
			return new Promise(async (resolve, reject) => {
				queryClient.fetchQuery({
					queryKey: ["poll-job", id, resolveOnStatus, timeoutMs],
					queryFn: async () => {
						const job = await fetchJob(id, {
							status: `eq.${resolveOnStatus}`,
						})

						if (job?.[0]?.status === resolveOnStatus) {
							resolve(job[0] as Job.JobItem<T>)
						} else {
							throw new Error(`Unexpected Status "${job?.[0]?.status}"`)
						}
					},
					retryDelay: JOB_POLL_INTERVAL_MS,
					retry: (failureCount) => {
						const shouldRetry = failureCount * JOB_POLL_INTERVAL_MS < timeoutMs

						if (!shouldRetry) {
							reject({
								status: 408, // Request Timeout
								message: `Job polling timed out after ${failureCount} tries (${timeoutMs} ms)`,
							})
						}
						return shouldRetry
					},
				})
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
