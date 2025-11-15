import { css } from "@emotion/react"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { ProductsPanel } from "./ProductsPanel"
import { RecipesPanel } from "./RecipesPanel"

export function Client() {
	const onChange = (key: string) => {
		console.log(key)
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
				background-color: white;
				box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
				padding: 8px;
				z-index: 999999999;
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
				<Tabs defaultActiveKey="products" onChange={onChange} items={items} />
			</div>
		</div>
	)
}
