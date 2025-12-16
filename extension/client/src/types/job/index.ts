export namespace Job {
	export type JobItem<T = Record<string, unknown>> = {
		id: string
		created_at: Date
		status: string
		data: T
	}

	export type UnknownData = Record<string, unknown>

	export type TrimmedJob = Omit<JobItem, "data">
}