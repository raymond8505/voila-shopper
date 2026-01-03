import { GlobalStyles } from "./components/common/styles/GlobalStyles"

import { Client } from "./components/Client"
import GlobalStylesPortal from "./GlobalStylesPortal"
import { RecipeModal } from "./components/recipe/RecipeModal/RecipeModal"
import { AntConfigProvider } from "./AntConfigProvider"
import { SourceIntegration } from "./components/SourceIntegration"

function App() {
	return (
		<AntConfigProvider>
			<GlobalStyles />
			<GlobalStylesPortal />
			<Client />
			<RecipeModal />
			<SourceIntegration />
		</AntConfigProvider>
	)
}

export default App
