import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

async function enableMocking() {
	if (process.env.NODE_ENV !== "development") {
		return
	}

	const { worker } = await import("./mocks/browser")

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start({
		onUnhandledRequest: "bypass",
	})
}

const wrapper = document.createElement("div")
wrapper.id = "vs-client-root"

const shadowRoot = wrapper.attachShadow({ mode: "open" })
document.body.appendChild(wrapper)

const emotionCache = createCache({
	key: "vs-client-emotion-cache",
	container: shadowRoot,
})

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

const queryClient = new QueryClient()

enableMocking().then(() => {
	ReactDOM.createRoot(shadowRoot).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<CacheProvider value={emotionCache}>
					<StyleProvider container={shadowRoot}>
						<App />
					</StyleProvider>
				</CacheProvider>
			</QueryClientProvider>
		</React.StrictMode>
	)
})
