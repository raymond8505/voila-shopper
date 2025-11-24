import { useCallback, useState } from "react"
import { Job, Workflow } from "../types"
import { useJobManager } from "./useJobManager"

export function useWorkflow<T = Job.UnknownData>(url: string) {
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<T | undefined>(undefined)
	const { pollJobData } = useJobManager()

	const call = useCallback(
		async ({
			payload,
			responseType = "hook",
			respondOnStatus = "done",
			hookOptions = {},
		}: {
			payload: Job.UnknownData
			responseType?: Workflow.ResponseType
			respondOnStatus?: string
			hookOptions?: RequestInit
		}) => {
			if (loading) {
				return false
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

				setLoading(false)

				if (responseType === "hook") {
					setResult(hookJSON)
				} else {
					try {
						const job = await pollJobData<T>(hookJSON.jobId, respondOnStatus)
						setResult(job?.data)
						return true
					} catch (e) {
						setResult(undefined)
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
	return { loading, result, call }
}
