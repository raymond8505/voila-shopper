import { css } from "@emotion/react"
import Tabs from "antd/es/tabs"
import type { TabsProps } from "antd/es/tabs"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"
import { SettingsPanel } from "./SettingsPanel"

import { useStore } from "../store"
import { DrawerButton } from "./DrawerButton"

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
		<div
			css={css`
				width: 25vw;
				height: 100vh;
				min-width: 360px;
				position: fixed;
				top: 0;
				left: 0;
				background-color: #f9f3eb;
				box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
				padding: 8px;
				z-index: 999999999;
				transition: transform 200ms ease-out;

				${drawerOpen
					? ""
					: `
					transform: translateX(-100%);	
				`}
			`}
		>
			<div
				css={css`
					&,
					.ant-tabs-tabpane,
					.ant-tabs-content-holder,
					.ant-tabs,
					.ant-tabs-content {
						height: 100%;
					}
				`}
			>
				<Tabs defaultActiveKey="products" items={items} />
			</div>
			<DrawerButton />
		</div>
	)
}
