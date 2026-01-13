import Tabs from "antd/es/tabs"
import type { TabsProps } from "antd/es/tabs"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"
import { SettingsPanel } from "./SettingsPanel"
import SettingOutlined from "@ant-design/icons/SettingOutlined"
import { useStore } from "@store/client"
import { DrawerButton } from "./DrawerButton"
import { Wrapper } from "./Client.styles"
import { useEffect } from "react"
import { useProducts } from "@src/hooks/useProducts"
import { isGA3ImpressionEvent } from "@src/integrations/voila/helpers"

const originalPush = window.dataLayer?.push
/**
 * The main wrapper for the client drawer
 */
export function Client() {
	const { drawerOpen } = useStore()
	const { hydrateProducts } = useProducts()

	useEffect(() => {
		/**
		 * Voila sends product info through the data layer on "view_item_list" events
		 * We hook into this behaviour to get product info as the user browses the site
		 */
		if (window.dataLayer?.push) {
			window.dataLayer.push = function (...args) {
				originalPush?.apply(window.dataLayer, args)
				if (isGA3ImpressionEvent(args[0])) {
					hydrateProducts(args[0]?.ecommerce?.impressions)
				}
			}
		}
	}, [hydrateProducts])

	const items: TabsProps["items"] = [
		{
			key: "price-tracker",
			label: "Price Tracker",
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
			icon: <SettingOutlined />,
		},
	]
	return (
		<Wrapper drawerOpen={drawerOpen}>
			<div>
				<Tabs
					defaultActiveKey="products"
					items={items}
					size="small"
				/>
			</div>
			<DrawerButton />
		</Wrapper>
	)
}
