import React from "react"
import ReactDOM from "react-dom/client"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { Dashboard } from "./components/dashboard/Dashboard.tsx"
import { GlobalStyles } from "./components/dashboard/styles/GlobalStyles.tsx"
import { HashRouter } from "react-router-dom"

async function enableMocking() {
	if (process.env.NODE_ENV !== "development") {
		return
	}

	const { worker } = await import("./mocks/browser.ts")

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start({
		onUnhandledRequest: "bypass",
	})
}
const root =
	document.getElementById("dashboard-root") ?? document.body
const emotionCache = createCache({
	key: "vs-client-emotion-cache",
	container: root,
})

const queryClient = new QueryClient()

enableMocking().then(() => {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<CacheProvider value={emotionCache}>
					<StyleProvider container={root}>
						<HashRouter>
							<Dashboard />
						</HashRouter>
						<GlobalStyles />
					</StyleProvider>
				</CacheProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	)
})
