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
		:root
		{
			--drawer-width: 25vw;
		}
        body div#app {
			transform: translateX(var(--drawer-width));
			width: calc(100vw - var(--drawer-width));
        }
		#main-header div[id^="popover-"][aria-label="Sign in"] {
			margin-left: calc(-1 * var(--drawer-width));
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
