import { useCallback } from "react"

import { Button, List } from "antd"

import { css } from "@emotion/react"
import { fetchCartProducts } from "../api/voila"
import { useStore } from "../store"
import { CloseOutlined } from "@ant-design/icons"
import { UnstyledButton } from "./common/elements.styles"

export function RecipesPanel() {
	const handleGetRecipesClick = useCallback(() => {
		fetchCartProducts().then((products) => {
			console.log("Cart products:", products)
		})
	}, [])

	const { ingredients, removeIngredient } = useStore()

	return (
		<div
			css={css`
				display: grid;
				gap: 8px;
				height: 100%;
				grid-template-rows: auto 1fr;
			`}
		>
			<div
				css={css`
					display: flex;
					gap: 8px;
				`}
			>
				<Button type="primary" onClick={handleGetRecipesClick}>
					Get Recipes
				</Button>
			</div>
			<div
				css={css`
					overflow: auto;
					padding: 8px;
				`}
			>
				<strong>Ingredients</strong>
				<List
					itemLayout="horizontal"
					dataSource={ingredients}
					renderItem={(product) => (
						<List.Item
							actions={[
								<UnstyledButton
									onClick={() => removeIngredient(product.productId)}
								>
									<CloseOutlined />
								</UnstyledButton>,
							]}
						>
							<List.Item.Meta
								avatar={
									product.images && product.images.length > 0 ? (
										<img
											alt={product.name}
											src={product.images[0].src}
											style={{ width: 50, height: 50, objectFit: "cover" }}
										/>
									) : null
								}
								title={product.name}
								description={`Price: ${
									product.promoPrice
										? product.promoPrice.amount
										: product.price.amount
								}`}
							/>
						</List.Item>
					)}
				></List>
				<strong>Recipes</strong>
			</div>
		</div>
	)
}
