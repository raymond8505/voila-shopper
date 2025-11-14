import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyleProvider } from "@ant-design/cssinjs"
const wrapper = document.createElement("div")
wrapper.id = "client-root"

const shadowRoot = wrapper.attachShadow({ mode: "open" })
document.body.appendChild(wrapper)

const emotionCache = createCache({
	key: "client-emotion-cache",
	container: shadowRoot,
})

const styleElement = document.createElement("style")
styleElement.setAttribute("type", "text/css")
styleElement.textContent = `
body > div#app
{
width: calc(75vw - 16px) !important;
}
`
document.head.appendChild(styleElement)
ReactDOM.createRoot(shadowRoot).render(
	<React.StrictMode>
		<CacheProvider value={emotionCache}>
			<StyleProvider container={shadowRoot}>
				<App />
			</StyleProvider>
		</CacheProvider>
	</React.StrictMode>
)
