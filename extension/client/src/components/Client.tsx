import Tabs from "antd/es/tabs"
import type { TabsProps } from "antd/es/tabs"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"
import { SettingsPanel } from "./SettingsPanel"

import { useStore } from "../store"
import { DrawerButton } from "./DrawerButton"
import { Wrapper } from "./Client.styles"

export function Client() {
	const { drawerOpen } = useStore()

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
				<Tabs defaultActiveKey="products" items={items} />
			</div>
			<DrawerButton />
		</Wrapper>
	)
}
