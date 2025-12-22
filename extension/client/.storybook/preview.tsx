import type { Preview } from "@storybook/react-vite"
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import {
	initialize as initializeMSW,
	mswLoader,
} from "msw-storybook-addon"
import { handlers as mswHandlers } from "../src/mocks/handlers"
import { useStore } from "../src/store"
import { useEffect } from "react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
import { GlobalStyles } from "../src/components/common/styles/GlobalStyles"
import GlobalStylesPortal from "../src/GlobalStylesPortal"
import ConfigProvider from "antd/es/config-provider"
import { AntConfigProvider } from "../src/AntConfigProvider"

initializeMSW()

const queryClient = new QueryClient()

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		msw: {
			handlers: mswHandlers,
		},
	},
	globalTypes: {
		workflowLiveMode: {
			description:
				"Toggles the value in store to determine whether n8n webhook calls go to /workflow/<id> or /workflow-test/<id>",
			toolbar: {
				title: "n8n Workflow State",
				items: [
					{ value: true, title: "Live" },
					{ value: false, title: "Test" },
				],
				dynamicTitle: false,
			},
		},
	},
	initialGlobals: {
		workflowLiveMode: true,
	},
	loaders: [mswLoader],
	decorators: [
		(Story) => {
			return (
				<AntConfigProvider>
					<CacheProvider
						value={createCache({
							key: "vs-client-emotion-cache--sb",
						})}
					>
						<GlobalStyles />
						<GlobalStylesPortal />
						<Story />
					</CacheProvider>
				</AntConfigProvider>
			)
		},
		(Story) => {
			return (
				<StyleProvider>
					<Story />
				</StyleProvider>
			)
		},
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<Story />
			</QueryClientProvider>
		),
		// set the global toolbar value for workflowLiveMode in store
		(Story, context) => {
			function StateSetter() {
				const { setWorkflowLiveMode } = useStore()

				useEffect(() => {
					setWorkflowLiveMode(context.globals.workflowLiveMode)
				}, [
					setWorkflowLiveMode,
					context.globals.workflowLiveMode,
				])

				return <Story />
			}

			return <StateSetter />
		},
	],
}

export default preview
