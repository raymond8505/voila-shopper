import type { Workflow } from "./index"

/**
 * Workflow.Error type guard
 * @param response
 * @returns
 */
export function isWorkflowError(response: unknown): response is Workflow.Error {
	return (
		(response as Workflow.Error).status !== undefined &&
		typeof (response as Workflow.Error).status === "number"
	)
}
