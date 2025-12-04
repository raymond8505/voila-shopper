import { useCallback, useState } from "react"
import { Job, Workflow } from "../types"
import { useJobManager } from "./useJobManager"
import { fixture } from "../api/helpers"

export function useWorkflow<T = Job.UnknownData>(url: string) {
	const [loading, setLoading] = useState(false)
	const { pollJobData } = useJobManager()

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
			if (loading) {
				return false
			}

			const isLocal = location.hostname === "localhost"

			if (isLocal) {
				switch (url) {
					case import.meta.env.VITE_WORKFLOW_RECOMMEND_RECIPES:
						return fixture<CallT>("recipeRecommendationsResponse")
					default:
						break
				}
			}

			setLoading(true)

			const fetchOptions = hookOptions ? hookOptions : {}

			try {
				const hookResp = await fetch(url, {
					body: JSON.stringify(payload),
					...fetchOptions,
					headers: {
						...(fetchOptions.headers ? fetchOptions.headers : {}),
					},
				})
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
						return job?.data
					} catch (e) {
						console.error("WORKFLOW ERROR", e)
						setLoading(false)
						return false
					}
				}
			} catch (e) {
				setLoading(false)
				console.error("WORKFLOW ERROR", e)
				return false
			}
		},
		[url, loading, setLoading]
	)
	return { loading, call }
}
