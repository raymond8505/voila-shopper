import Menu from "antd/es/menu"
import Layout, { Content, Header } from "antd/es/layout/layout"

import { Route, Routes, useNavigate } from "react-router-dom"
import { ProductList } from "./views/ProductList/ProductList"
import { SingleProduct } from "./views/SingleProduct/SingleProduct"

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
				/>
			</Header>
			<Content style={{ padding: "16px" }}>
				<Routes>
					<Route path="/" element={<div>home</div>} />
					<Route path="/products" element={<ProductList />} />
					<Route
						path="/product/:productId"
						element={<SingleProduct />}
					/>
				</Routes>
			</Content>
		</Layout>
	)
}
