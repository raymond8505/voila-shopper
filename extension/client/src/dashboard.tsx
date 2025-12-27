import React from "react"
import ReactDOM from "react-dom/client"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { Dashboard } from "./components/dashboard/Dashboard"
import { AntConfigProvider } from "./components/dashboard/AntConfigProvider"

async function enableMocking() {
	if (process.env.NODE_ENV !== "development") {
		return
	}

	const { worker } = await import("./mocks/browser")

	return worker.start({
		onUnhandledRequest: "bypass",
	})
}

const root = document.getElementById("dashboard-root")
const emotionCache = createCache({
	key: "shopper-dashboard-emotion-cache",
	container: root ?? document.body,
})

const queryClient = new QueryClient()

if (root) {
	enableMocking().then(() => {
		ReactDOM.createRoot(root).render(
			<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<CacheProvider value={emotionCache}>
						<StyleProvider container={root}>
							<AntConfigProvider>
								<Dashboard />
							</AntConfigProvider>
						</StyleProvider>
					</CacheProvider>
				</QueryClientProvider>
			</React.StrictMode>
		)
	})
}
