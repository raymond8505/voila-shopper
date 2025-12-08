import type { Workflow } from "./index"
export function isWorkflowError(response: unknown): response is Workflow.Error {
	return (
		(response as Workflow.Error).status !== undefined &&
		typeof (response as Workflow.Error).status === "number"
	)
}
