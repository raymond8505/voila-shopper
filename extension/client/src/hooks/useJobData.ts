import { useQuery } from "@tanstack/react-query"
import { Job } from "../types"
import { supabaseRequest } from "../api/supabase"

const JOB_CHECK_INTERVAL_MS = 15000
export function useJobData<DataType>({
	jobId,
	waitForStatus,
}: {
	jobId?: string
	waitForStatus?: string
}) {
	const { data } = useQuery<Job.JobItem<DataType>>({
		enabled: (q) =>
			Boolean(
				jobId && (waitForStatus ? q.state.data.status !== waitForStatus : true)
			),
		queryKey: ["job-data", jobId, waitForStatus],
		queryFn: async () => {
			const resp = await supabaseRequest({
				table: "jobs",
				tableParams: {
					select: "*",
					id: `eq.${jobId}`,
				},
			})

			const json = (await resp.json()) as Job.JobItem[]
			const item = json[0]

			return {
				...item,
				data: JSON.parse(item.data as string) as DataType,
			}
		},
		refetchInterval: jobId ? JOB_CHECK_INTERVAL_MS : false,
	})

	console.log({ data })
	return data
}
