import { GlobalStyles } from "./components/common/styles/GlobalStyles"
import ConfigProvider from "antd/es/config-provider"

import { Client } from "./components/Client"
import GlobalStylesPortal from "./GlobalStylesPortal"
import { RecipeModal } from "./components/recipe/RecipeModal/RecipeModal"

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
			<RecipeModal />
		</ConfigProvider>
	)
}

export default App
