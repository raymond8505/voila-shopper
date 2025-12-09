import { useCallback } from "react"
import { Workflow } from "../types/index"

import { useWebhookQuery } from "./useWebhookQuery"

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
	} = useWebhookQuery<RequestPayloadType, ResponsePayloadType>({
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
		[]
	)

	return {
		call,
		data: responseType === "hook" ? webhookData : undefined,
		pending: responseType === "hook" ? webhookPending : webhookPending || false,
	}
}
