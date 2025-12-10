import { useCallback, useMemo, useState } from "react"
import { useStore } from "../store"
import { useQuery } from "@tanstack/react-query"
import type { Workflow } from "../types"

export function useWebhookQuery<RequestPayloadType, ResponsePayloadType>({
	url,
	auth,
}: Workflow.UseWorkflowParams) {
	const { workflowLiveMode } = useStore()

	const hookURL = useMemo(() => {
		return workflowLiveMode ? url : url.replace("/webhook/", "/webhook-test/")
	}, [workflowLiveMode, url])

	const [webhookEnabled, setWebhookEnabled] = useState(false)

	const [params, setParams] = useState<Workflow.CallParams<RequestPayloadType>>(
		{
			payload: undefined,
			respondOnStatus: undefined,
			hookOptions: undefined,
			timeout: undefined,
		}
	)

	const { data, isPending, refetch } = useQuery({
		queryKey: ["webhook", hookURL, auth, ...Object.values(params)],
		enabled: webhookEnabled,

		queryFn: async () => {
			const fetchOptions = params.hookOptions ? params.hookOptions : {}
			const combinedHeaders = new Headers(fetchOptions.headers)

			if (auth?.username && auth?.password) {
				combinedHeaders.set(
					// btoa use not meant to encrypt, just what n8n requires for Basic Auth
					"Authorization",
					`Basic ${btoa(`${auth.username}:${auth.password}`)}`
				)
			}

			const resp = await fetch(
				workflowLiveMode ? url : url.replace("/webhook/", "/webhook-test/"),
				{
					body: JSON.stringify(params.payload),
					...fetchOptions,
					headers: combinedHeaders,
				}
			)

			setWebhookEnabled(false)

			if (resp.ok) {
				return await resp.json()
			} else {
				let message = ""

				switch (resp.status) {
					case 404:
						message = "Webhook Not Found"
						break
					case 403:
						message = "Incorrect username or password"
						break
					default:
						message = await resp.statusText
				}

				return {
					status: resp.status,
					message,
				} as Workflow.Error
			}
		},
	})

	const call: Workflow.UseWorflow<
		RequestPayloadType,
		ResponsePayloadType
	>["call"] = useCallback(
		({ payload, respondOnStatus, hookOptions, timeout }) => {
			setParams({
				payload,
				respondOnStatus,
				hookOptions,
				timeout,
			})

			setWebhookEnabled(true)
		},
		[setWebhookEnabled, refetch, webhookEnabled, params]
	)
	return {
		pending: isPending && webhookEnabled,
		call,
		data: data as ResponsePayloadType,
	}
}
