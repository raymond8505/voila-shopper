import Tabs from "antd/es/tabs"
import type { TabsProps } from "antd/es/tabs"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"
import { SettingsPanel } from "./SettingsPanel"

import { useStore } from "@store/client"
import { DrawerButton } from "./DrawerButton"
import { Wrapper } from "./Client.styles"

/**
 * The main wrapper for the client drawer
 */
export function Client() {
	const { drawerOpen } = useStore()

	const originalPush = window.dataLayer?.push

	if (window.dataLayer?.push) {
		window.dataLayer.push = function (...args) {
			originalPush?.apply(window.dataLayer, args)

			if (args[0]?.eventAction === "view_item_list") {
				console.log(
					"item list viewed:",
					args[0]?.ecommerce?.impressions
				)
			}
		}
	}

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
