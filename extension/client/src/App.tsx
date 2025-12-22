import { GlobalStyles } from "./components/common/styles/GlobalStyles"

import { Client } from "./components/Client"
import GlobalStylesPortal from "./GlobalStylesPortal"
import { RecipeModal } from "./components/recipe/RecipeModal/RecipeModal"
import { AntConfigProvider } from "./AntConfigProvider"

function App() {
	return (
		<AntConfigProvider>
			<GlobalStyles />
			<GlobalStylesPortal />
			<Client />
			<RecipeModal />
		</AntConfigProvider>
	)
}

export default App
