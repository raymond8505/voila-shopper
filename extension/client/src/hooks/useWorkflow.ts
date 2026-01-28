import { useCallback, useState } from "react"
import { Job, Workflow } from "../types/index"
import { useJobManager } from "./useJobManager"
import { useStore } from "@store/client"
import { useQueryClient } from "@tanstack/react-query"

export function useWorkflow<T = Job.UnknownData>({
	url,
	auth,
}: {
	url: string
	auth?: { username: string; password: string }
}) {
	const [loading, setLoading] = useState(false)
	const { pollJobData } = useJobManager()
	const { workflowLiveMode } = useStore()

	const queryClient = useQueryClient()

	const call = useCallback(
		async <Payload = unknown, CallT = T>({
			payload,
			responseType = "hook",
			respondOnStatus = "done",
			hookOptions = {},
			timeout = 1000 * 60 * 15, // 15 minutes,
			ttl,
		}: {
			payload: Payload
			responseType?: Workflow.ResponseType
			respondOnStatus?: string
			hookOptions?: RequestInit
			/**
			 * only for responseType "job"
			 */
			timeout?: number
			ttl?: number
		}) => {
			const queryKey = [
				`use-workflow-${workflowLiveMode ? "live" : "test"}`,
				url,
				payload,
				responseType,
				respondOnStatus,
				timeout,
				workflowLiveMode,
			]
			// safely hash the query by converting to UTF-8 before hashing
			const hashedKey = `price-tracker${btoa(
				String.fromCodePoint(
					...new TextEncoder().encode(JSON.stringify(queryKey)),
				),
			)}`
			return queryClient.fetchQuery({
				queryKey,
				queryFn: async () => {
					if (ttl) {
						const cached =
							window.sessionStorage.getItem(hashedKey)

						if (cached) {
							return JSON.parse(cached) as CallT
						}
					}

					setLoading(true)

					const fetchOptions = hookOptions ? hookOptions : {}

					try {
						const combinedHeaders = new Headers(
							fetchOptions.headers,
						)
						if (auth) {
							combinedHeaders.set(
								"Authorization",
								`Basic ${btoa(
									`${auth.username}:${auth.password}`,
								)}`,
							)
						}

						const hookResp = await fetch(
							workflowLiveMode
								? url
								: url.replace("/webhook/", "/webhook-test/"),
							{
								body: JSON.stringify(payload),
								...fetchOptions,
								headers: combinedHeaders,
							},
						)

						if (hookResp.ok) {
							const hookJSON = await hookResp.json()

							if (responseType === "hook") {
								setLoading(false)
								window.sessionStorage.setItem(
									hashedKey,
									JSON.stringify(hookJSON),
								)
								return hookJSON as CallT
							} else {
								const job = await pollJobData<CallT>(
									hookJSON.id,
									respondOnStatus,
									timeout,
								)
								setLoading(false)
								window.sessionStorage.setItem(
									hashedKey,
									JSON.stringify(job?.data),
								)
								return job?.data as CallT
							}
						} else {
							setLoading(false)
							throw new Error(
								`Workflow hook error: ${await hookResp.text()}`,
							)
						}
					} finally {
						setLoading(false)
					}
				},
			})
		},
		[
			url,
			loading,
			setLoading,
			workflowLiveMode,
			queryClient,
			pollJobData,
			auth,
		],
	)

	return { loading, call }
}
