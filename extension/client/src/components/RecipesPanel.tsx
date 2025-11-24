import { useCallback, useState } from "react"

// import { Button, Collapse, List,
import Splitter from "antd/es/splitter"
import Button from "antd/es/button"
import Collapse from "antd/es/collapse"

import List from "antd/es/list"

import { css } from "@emotion/react"

import { useStore } from "../store"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { UnstyledButton } from "./common/elements.styles"
import TextArea from "antd/es/input/TextArea"
import type { Recipe } from "../types"
import { useRecipes } from "../hooks/useRecipes"
export function RecipesPanel() {
	const { ingredients, removeIngredient } = useStore()
	const [recipes, setRecipes] = useState<Recipe.ApiResponse["recipes"]>()
	const [extraCriteria, setExtraCriteria] = useState("")
	const { generateRecipeRecommendations, recipeRecommendationsLoading } =
		useRecipes()

	const handleGetRecipesClick = useCallback(() => {
		generateRecipeRecommendations({
			ingredients,
			extraCriteria,
		}).then((resp) => {
			if (resp) {
				setRecipes(resp.recipes ?? [])
			}
		})
	}, [setRecipes, ingredients, extraCriteria])

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
				<Button
					type="primary"
					onClick={handleGetRecipesClick}
					disabled={recipeRecommendationsLoading}
					icon={recipeRecommendationsLoading ? <LoadingOutlined /> : undefined}
				>
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
							<TextArea
								placeholder={`Extra recipe criteria, for example "Indian" or "No Dairy"`}
								onChange={(e) => setExtraCriteria(e.target.value)}
							></TextArea>
							<Collapse>
								{recipes?.map((recipe) => {
									return (
										<Collapse.Panel
											header={recipe.recipe.Name as string}
											key={recipe.recipe.Name as string}
										>
											<div>Used: {recipe.ingredients_used as string}</div>
											<div>Needed: {recipe.ingredients_needed as string}</div>
											{/* <div
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
											</div> */}
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
