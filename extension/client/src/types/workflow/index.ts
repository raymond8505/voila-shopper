export namespace Workflow {
	/**
	 * "job" - The workflow responds with a job id
	 */
	export type ResponseType = "job" | "hook"

	export interface Error {
		status: number
		message: string
	}
}
