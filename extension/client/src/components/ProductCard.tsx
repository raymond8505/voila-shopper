import Button from "antd/es/button"
import Card from "antd/es/card"
import type { Voila } from "../types"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"
import FormOutlined from "@ant-design/icons/FormOutlined"
import { addToCart } from "../api/voila"
import { useStore } from "../store"
import { css } from "@emotion/react"
export function ProductCard({ product }: { product: Voila.Product }) {
	const { addIngredient } = useStore()
	return (
		<div
			css={css`
				.ant-card-actions {
					flex-direction: column;
					gap: 4px;

					button,
					li {
						width: 100% !important;
						margin: 0;
					}
				}
			`}
		>
			<Card
				cover={
					product.images && product.images.length > 0 ? (
						<img alt={product.name} src={product.images[0].src} />
					) : null
				}
				key={product.productId}
				actions={[
					<Button
						icon={<ShoppingCartOutlined />}
						onClick={() => {
							addToCart({
								productId: product.productId,
								quantity: 1,
							})
						}}
					>
						Add To Cart
					</Button>,
					<Button
						icon={<FormOutlined />}
						onClick={() => {
							addIngredient(product)
						}}
					>
						Add Ingredient
					</Button>,
				]}
			>
				<Card.Meta
					title={product.name}
					description={
						<>
							<dl
								style={{
									fontSize: "max(.8em,10px)",
								}}
							>
								<dt>
									<strong style={{ color: "#9d2500" }}>Sale Price</strong>
								</dt>
								<dd>
									<strong style={{ color: "#9d2500" }}>
										{product.promoPrice?.amount}
									</strong>
								</dd>
								<dt>Regular Price</dt>
								<dd>{product.price.amount}</dd>
							</dl>
						</>
					}
				/>
			</Card>
		</div>
	)
}
