import { GlobalStyles } from "./components/common/styles/GlobalStyles"
import { ConfigProvider } from "antd"

import { Client } from "./components/Client"

function App() {
	return (
		<ConfigProvider>
			<GlobalStyles />
			<Client />
		</ConfigProvider>
	)
}

export default App
