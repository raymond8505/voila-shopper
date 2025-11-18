import { GlobalStyles } from "./components/common/styles/GlobalStyles"
import ConfigProvider from "antd/es/config-provider"

import { Client } from "./components/Client"

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
			<Client />
		</ConfigProvider>
	)
}

export default App
