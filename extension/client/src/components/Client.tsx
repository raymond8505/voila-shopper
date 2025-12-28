import Tabs from "antd/es/tabs"
import type { TabsProps } from "antd/es/tabs"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"
import { SettingsPanel } from "./SettingsPanel"

import { useStore } from "@store/client"
import { DrawerButton } from "./DrawerButton"
import { Wrapper } from "./Client.styles"
import { useEffect } from "react"

const originalPush = window.dataLayer?.push
/**
 * The main wrapper for the client drawer
 */
export function Client() {
	const { drawerOpen } = useStore()

	useEffect(() => {
		/**
		 * Voila sends product info through the data layer on "view_item_list" events
		 * We hook into this behaviour to get product info as the user browses the site
		 */
		if (window.dataLayer?.push) {
			window.dataLayer.push = function (...args) {
				originalPush?.apply(window.dataLayer, args)

				if (args[0]?.event === "view_item_list") {
					console.log(
						"item list viewed:",
						args[0]?.ecommerce?.items
					)
				}
			}
		}
	}, [])

	const items: TabsProps["items"] = [
		{
			key: "products",
			label: "Products",
			children: <ProductsPanel />,
		},
		{
			key: "recipes",
			label: "Recipes",
			children: <RecipesPanel />,
		},
		{
			key: "settings",
			label: "Settings",
			children: <SettingsPanel />,
		},
	]
	return (
		<Wrapper drawerOpen={drawerOpen}>
			<div>
				<Tabs defaultActiveKey="recipes" items={items} />
			</div>
			<DrawerButton />
		</Wrapper>
	)
}
