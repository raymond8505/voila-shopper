import Menu from "antd/es/menu"
import Layout, { Content, Header } from "antd/es/layout/layout"

import { Route, Routes, useNavigate } from "react-router-dom"

export function Dashboard() {
	const navigate = useNavigate()
	return (
		<Layout style={{ width: "100vw", height: "100vh" }}>
			<Header>
				<Menu
					items={[
						{
							label: "Products",
							key: "product-list",
							onClick: () => {
								navigate("/products")
							},
						},
						{
							label: "Recipes",
							key: "recipe-list",
						},
						{
							label: "Sources",
							key: "source-list",
						},
						{
							label: "Settings",
							key: "settings",
						},
					]}
					mode="horizontal"
				></Menu>
			</Header>
			<Content>
				<Routes>
					<Route path="/" element={<div>home</div>} />
					<Route
						path="/products"
						element={<div>products</div>}
					/>
					<Route
						path="/product/:productId"
						element={<div>single product</div>}
					/>
				</Routes>
			</Content>
		</Layout>
	)
}
