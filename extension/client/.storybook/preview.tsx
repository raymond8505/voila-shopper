import type { Preview } from "@storybook/react-vite"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { initialize, mswLoader } from "msw-storybook-addon"	
import { handlers as mswHandlers } from '../src/mocks/handlers';

initialize()

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
			handlers: mswHandlers
		}
	},
	loaders: [mswLoader],
	decorators: [
		// TODO: add store decorator
		(Story) => (
			<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
		),
	],
}

export default preview
