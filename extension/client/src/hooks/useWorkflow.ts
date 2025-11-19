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
		}: {
			payload: Job.UnknownData
			responseType?: Workflow.ResponseType
			respondOnStatus?: string
		}) => {
			if (loading) {
				return false
			}

			setLoading(true)

			try {
				const hookResp = await fetch(url, { body: JSON.stringify(payload) })
				const hookJSON = await hookResp.json()

				setLoading(false)

				if (responseType === "hook") {
					setResult(hookJSON)
				} else {
					setResult(
						(await pollJobData<T>(JSON.stringify(hookJSON), respondOnStatus))
							.data
					)
				}
				return true
			} catch (e) {
				setLoading(false)
				console.error(e)
				return false
			}
		},
		[url, loading, setLoading]
	)
	return { loading, result, call }
}
