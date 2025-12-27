/**
 * @fileoverview Content script to attach the client script. Attaching this way instead of including
 * as its own content script gives direct DOM access and lets us be a true module
 */
function attachScript(src: string) {
	const injectScript = document.createElement("script")
	injectScript.id = "dispatch-initial-state"
	injectScript.type = "module"

	injectScript.src = chrome.runtime.getURL(src)

	document.head.appendChild(injectScript)
}
// @ts-ignore
if (chrome?.runtime?.getURL) {
	window.addEventListener("message", (msg) => {
		if (msg.data.type === "VOILA_INITIAL_STATE_FROM_PAGE") {
			window.__INITIAL_STATE__ = msg.data.payload
		}
	})
	attachScript("client/dist/dispatchInitialState.js")
	attachScript("client/dist/client.js")
}
