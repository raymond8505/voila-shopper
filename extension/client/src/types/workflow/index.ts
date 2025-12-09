export namespace Workflow {
	/**
	 * "job" - The workflow responds with a job id
	 */
	export type ResponseType = "job" | "hook"

	export interface Error {
		status: number
		message: string
	}

	export interface UseWorflow<
		RequestPayloadType = Record<string, unknown>,
		ResponsePayloadType = Record<string, unknown>
	> {
		data: ResponsePayloadType | Error
		pending: boolean
		call: (params: {
			payload: RequestPayloadType
			respondOnStatus?: string
			hookOptions?: RequestInit
			/**
			 * only for responseType "job"
			 */
			timeout?: number
		}) => void
	}

	export interface UseWorkflowParams {
		url: string
		auth?: { username: string; password: string }
		responseType?: Workflow.ResponseType
	}
}
