import { GlobalStyles } from "./components/common/styles/GlobalStyles"
import ConfigProvider from "antd/es/config-provider"

import { Client } from "./components/Client"
import GlobalStylesPortal from "./GlobalStylesPortal"

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorHighlight: "#00d6ff",
					colorPrimaryActive: "#00d6ff",
					colorText: "#004740",
				},
			}}
		>
			<GlobalStyles />
			<GlobalStylesPortal />
			<Client />
		</ConfigProvider>
	)
}

export default App
