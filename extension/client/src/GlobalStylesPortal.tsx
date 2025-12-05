import React from "react"
import ReactDOM from "react-dom"
import { useStore } from "./store"

/**
 * For styling the whole site with access to store
 * @returns
 */
const GlobalStylesPortal: React.FC = () => {
	const { drawerOpen } = useStore()

	const styleContent = `
        body > div#app {
            width: calc(75vw - 16px) !important;
            margin-left: 25vw !important;
        }
    `

	return ReactDOM.createPortal(
		<style
			type="text/css"
			id="vs-global-styles-portal"
			dangerouslySetInnerHTML={{ __html: drawerOpen ? styleContent : "" }}
		/>,
		document.head
	)
}

export default GlobalStylesPortal
