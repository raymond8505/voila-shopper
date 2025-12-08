import type { Workflow, Recipe } from "./index"
export function isWorkflowError(
	response: Workflow.Error | Recipe.ApiResponse
): response is Workflow.Error {
	return (
		(response as Workflow.Error).status !== undefined &&
		typeof (response as Workflow.Error).status === "number"
	)
}
