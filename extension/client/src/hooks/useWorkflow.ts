import { useCallback } from "react"
import { Job, Workflow } from "../types/index"

import { useWebhookQuery } from "./useWebhookQuery"
import { useJobData } from "./useJobData"

export function useWorkflow<RequestPayloadType, ResponsePayloadType>({
	url,
	auth,
	responseType = "hook",
}: Workflow.UseWorkflowParams): Workflow.UseWorflow<
	RequestPayloadType,
	ResponsePayloadType
> {
	const {
		data: webhookData,
		call: callWebhook,
		pending: webhookPending,
	} = useWebhookQuery<RequestPayloadType | Job.JobItem, ResponsePayloadType>({
		url,
		auth,
	})

	const call: Workflow.UseWorflow<
		RequestPayloadType,
		ResponsePayloadType
	>["call"] = useCallback(
		({ payload, respondOnStatus, hookOptions, timeout }) => {
			callWebhook({
				payload,
				respondOnStatus,
				hookOptions,
				timeout,
			})
		},
		[callWebhook]
	)

	const jobData = useJobData<ResponsePayloadType>({
		jobId: (webhookData as Job.JobItem)?.id,
		waitForStatus: responseType === "hook" ? undefined : "done",
	})
	return {
		call,
		data: responseType === "hook" ? webhookData : jobData.data,
		pending:
			responseType === "hook"
				? webhookPending
				: webhookPending || jobData === undefined,
	}
}
