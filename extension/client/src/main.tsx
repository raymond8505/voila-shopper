import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
const wrapper = document.createElement("div")
wrapper.id = "client-root"

const shadowRoot = wrapper.attachShadow({ mode: "open" })
document.body.appendChild(wrapper)

const emotionCache = createCache({
	key: "client-emotion-cache",
	container: shadowRoot,
})

const styleElement = document.createElement("style")
styleElement.setAttribute("type", "text/css")
styleElement.textContent = `
body > div#app
{
width: calc(75vw - 16px) !important;
margin-left: 25vw !important;
}
`

if (chrome?.runtime?.getURL) {
	window.addEventListener("message", (msg) => {
		if (msg.data.type === "VOILA_INITIAL_STATE_FROM_PAGE") {
			window.__INITIAL_STATE__ = msg.data.payload
		}
	})
	const injectScript = document.createElement("script")
	injectScript.id = "dispatch-initial-state"

	injectScript.src = chrome.runtime.getURL(
		"client/dist/dispatchInitialState.js"
	)

	document.head.appendChild(injectScript)
}

ReactDOM.createRoot(shadowRoot).render(
	<React.StrictMode>
		<CacheProvider value={emotionCache}>
			<StyleProvider container={shadowRoot}>
				<App />
			</StyleProvider>
		</CacheProvider>
	</React.StrictMode>
)
