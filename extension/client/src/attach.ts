/**
 * @fileoverview Content script to attach the client script. Attaching this way instead of including
 * as its own content script gives direct DOM access and lets us be a true module
 */
function attachScript({
	src,
	id,
	data,
}: {
	src: string
	id: string
	data?: Record<string, string | number>
}) {
	const injectScript = document.createElement("script")
	injectScript.id = id
	injectScript.type = "module"

	if (data) {
		Object.entries(data).forEach(([key, val]) => {
			injectScript.setAttribute(`data-${key}`, val.toString())
		})
	}

	injectScript.src = chrome.runtime.getURL(src)

	document.head.appendChild(injectScript)
}
// @ts-ignore TS thinks chrome?.runtime?.getURL is "always available" it is not.
if (chrome?.runtime?.getURL) {
	window.addEventListener("message", (msg) => {
		if (msg.data.type === "VOILA_INITIAL_STATE_FROM_PAGE") {
			window.__INITIAL_STATE__ = msg.data.payload
		}
	})
	attachScript({
		src: "client/dist/dispatchInitialState.js",
		id: "vs-dispatch-initial-state",
	})
	attachScript({
		src: `client/dist/client.js`,
		id: "vs-client",
	})
}
