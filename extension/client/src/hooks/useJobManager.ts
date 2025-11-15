import { useCallback } from "react"
import { supabaseRequest } from "../api/supabase"

export function useJobManager() {
	const getJobData: <T = unknown>(id: string) => Promise<T[]> = useCallback(
		async (id: string) => {
			const resp = await supabaseRequest({
				table: "jobs",
				tableParams: { select: "data", id: `eq.${id}` },
			})

			const json = await resp.json()

			return json.map((item) => JSON.parse(item.data))
		},
		[]
	)

	return { getJobData }
}
