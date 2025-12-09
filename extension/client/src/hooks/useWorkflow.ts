import { useCallback, useMemo, useState } from "react"
import { Workflow } from "../types/index"
import { useStore } from "../store"
import { useQuery } from "@tanstack/react-query"
import isEqual from "lodash.isequal"
//import { fixture } from "../api/helpers"

export function useWorkflow<RequestPayloadType, ResponsePayloadType>({
	url,
	auth,
}: Workflow.UseWorkflowParams): Workflow.UseWorflow<
	RequestPayloadType,
	ResponsePayloadType
> {
	const { workflowLiveMode } = useStore()

	const hookURL = useMemo(() => {
		return workflowLiveMode ? url : url.replace("/webhook/", "/webhook-test/")
	}, [workflowLiveMode, url])

	// Memoize the auth object for queryKey stability.
	// This prevents re-fetches if the parent passes a new object reference for auth
	// but the content (username, password) remains the same.
	const memoizedAuth = useMemo(() => auth, [auth?.username, auth?.password])

	const [payload, setPayload] = useState<RequestPayloadType>(
		{} as RequestPayloadType
	)

	const [responseType, setResponseType] = useState<
		Workflow.ResponseType | undefined
	>(undefined)

	const [respondOnStatus, setRespondOnStatus] = useState<string | undefined>(
		undefined
	)

	const [hookOptions, setHookOptions] = useState<RequestInit | undefined>(
		undefined
	)

	const [queryTimeout, setQueryTimeout] = useState<number | undefined>(
		undefined
	)

	const [webhookEnabled, setWebhookEnabled] = useState(false)

	const {
		data: webHookData,
		isPending: webhookPending,
		refetch,
	} = useQuery({
		queryKey: [
			"webhook",
			hookURL,
			memoizedAuth,
			payload,
			respondOnStatus,
			hookOptions,
			queryTimeout,
		],
		enabled: webhookEnabled,

		queryFn: async () => {
			const fetchOptions = hookOptions ? hookOptions : {}
			const combinedHeaders = new Headers(fetchOptions.headers)

			if (auth) {
				combinedHeaders.set(
					// Note: btoa is base64 encoding, not encryption. For sensitive data, consider more secure methods.
					"Authorization",
					`Basic ${btoa(`${auth.username}:${auth.password}`)}`
				)
			}

			const resp = await fetch(
				workflowLiveMode ? url : url.replace("/webhook/", "/webhook-test/"),
				{
					body: JSON.stringify(payload),
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
						message = "Workflow Not Found"
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
		({
			payload: newPayload,
			responseType: newResponseType,
			respondOnStatus: newRespondOnStatus,
			hookOptions: newHookOptions,
			timeout: newTimeout,
		}) => {
			if (!isEqual(payload, newPayload)) {
				setPayload(newPayload)
			}
			if (responseType !== newResponseType) {
				setResponseType(newResponseType)
			}
			if (respondOnStatus !== newRespondOnStatus) {
				setRespondOnStatus(newRespondOnStatus)
			}
			if (!isEqual(hookOptions, newHookOptions)) {
				setHookOptions(newHookOptions)
			}
			if (queryTimeout !== newTimeout) {
				setQueryTimeout(newTimeout)
			}

			setWebhookEnabled(true)
		},
		[
			setPayload,
			setResponseType,
			setRespondOnStatus,
			setHookOptions,
			setQueryTimeout,
			setWebhookEnabled,
			refetch,
			webhookEnabled,
			payload,
			responseType,
			respondOnStatus,
			hookOptions,
			queryTimeout,
		]
	)
	return {
		pending: webhookPending && webhookEnabled,
		call,
		data: webHookData,
	}
}
