import { useCallback, useState } from "react"

// import { Button, Collapse, List,
import Splitter from "antd/es/splitter"
import Button from "antd/es/button"
import Collapse from "antd/es/collapse"
import List from "antd/es/list"

import { css } from "@emotion/react"

import { useStore } from "../store"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import { UnstyledButton } from "./common/elements.styles"
import Markdown from "react-markdown"
export function RecipesPanel() {
	const { ingredients, removeIngredient } = useStore()
	const [recipes, setRecipes] = useState<Record<string, unknown>[]>([])
	const handleGetRecipesClick = useCallback(() => {
		fetch(
			"https://raymond8505.app.n8n.cloud/webhook-test/voila-shopper-recipes",
			{
				body: JSON.stringify({
					ingredients: ingredients.map((ingredient) => {
						return [
							"productId",
							"name",
							"packageSizeDescription",
							"price",
							"promoPrice",
							"unitPrice",
							"promoUnitPrice",
							"categoryPath",
						].reduce((acc, key) => {
							acc[key] = ingredient[key]
							return acc
						}, {})
					}),
				}),
				method: "POST",
			}
		).then(async (resp) => {
			setRecipes(JSON.parse((await resp.json()).content.parts[0].text))
		})
	}, [setRecipes])

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
				<Splitter layout="vertical">
					<Splitter.Panel min={188}>
						<div
							css={css`
								padding: 8px 0;
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
														style={{
															width: 50,
															height: 50,
															objectFit: "cover",
														}}
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
						</div>
					</Splitter.Panel>
					<Splitter.Panel>
						<div
							css={css`
								margin: 8px 0;
							`}
						>
							<strong>Recipes</strong>
							<Collapse>
								{recipes.map((recipe) => {
									return (
										<Collapse.Panel
											header={recipe.title as string}
											key={recipe.title as string}
										>
											<div
												css={css`
													line-height: 1.2;

													h2 {
														font-size: 1.5em;
														font-weight: 100;

														&:not(:first-of-type) {
															margin-top: 1.5em;
															padding-top: 0.5em;
															border-top: 1px solid rgba(0, 0, 0, 0.4);
														}
													}
													h3 {
														font-size: 1.2em;
														font-weight: bold;
													}

													ul,
													ol {
														margin: 8px 0;
														padding-left: 1.5em;
													}

													ul {
														list-style: disc;
													}

													ol {
														list-style: decimal;
													}
												`}
											>
												<Markdown>{recipe.content as string}</Markdown>
											</div>
										</Collapse.Panel>
									)
								})}
							</Collapse>
						</div>
					</Splitter.Panel>
				</Splitter>
			</div>
		</div>
	)
}
