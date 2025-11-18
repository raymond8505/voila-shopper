import ConfigProvider from "antd/es/config-provider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { GlobalStyles } from "../components/common/styles/GlobalStyles"
import { ClientPlayground } from "./components/ClientPlayground"

createRoot(document.getElementById("client-playground")!).render(
	<StrictMode>
		<ConfigProvider>
			<GlobalStyles />
			<ClientPlayground />
		</ConfigProvider>
	</StrictMode>
)
