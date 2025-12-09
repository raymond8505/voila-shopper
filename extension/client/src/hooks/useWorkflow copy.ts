import { useCallback, useState } from "react"
import { Job, Workflow } from "../types/index"
import { useJobManager } from "./useJobManager"
import { useStore } from "../store"
//import { fixture } from "../api/helpers"

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

	const call = useCallback(
		async <Payload extends Job.UnknownData, CallT = T>({
			payload,
			responseType = "hook",
			respondOnStatus = "done",
			hookOptions = {},
			timeout = 1000 * 60 * 15, // 15 minutes,
		}: {
			payload: Payload
			responseType?: Workflow.ResponseType
			respondOnStatus?: string
			hookOptions?: RequestInit
			/**
			 * only for responseType "job"
			 */
			timeout?: number
		}) => {
			console.log({ workflowLiveMode, loading })
			if (loading) {
				return false
			}

			const isLocal = location.hostname === "localhost"

			if (isLocal) {
				switch (url) {
					// case import.meta.env.VITE_WORKFLOW_RECOMMEND_RECIPES:
					// 	return fixture<CallT>("recipeRecommendationsResponse")
					default:
						break
				}
			}

			setLoading(true)

			const fetchOptions = hookOptions ? hookOptions : {}

			try {
				const combinedHeaders = new Headers(fetchOptions.headers)
				if (auth) {
					combinedHeaders.set(
						"Authorization",
						`Basic ${btoa(`${auth.username}:${auth.password}`)}`
					)
				}

				const hookResp = await fetch(
					workflowLiveMode ? url : url.replace("/webhook/", "/webhook-test/"),
					{
						body: JSON.stringify(payload),
						...fetchOptions,
						headers: combinedHeaders,
					}
				)

				if (hookResp.ok) {
					const hookJSON = await hookResp.json()

					if (responseType === "hook") {
						setLoading(false)
						return hookJSON as CallT
					} else {
						try {
							const job = await pollJobData<CallT>(
								hookJSON.id,
								respondOnStatus,
								timeout
							)
							setLoading(false)
							return job?.data as CallT
						} catch (e) {
							setLoading(false)
							return {
								status: 200,
								message: e?.["message"],
							} as Workflow.Error
						}
					}
				} else {
					setLoading(false)
					return {
						status: hookResp.status,
						message: await hookResp.text(),
					} as Workflow.Error
				}
			} catch (e) {
				setLoading(false)

				return {
					status: 200,
					message: e?.["message"],
				} as Workflow.Error
			}
		},
		[url, loading, setLoading, workflowLiveMode]
	)
	return { loading, call }
}
