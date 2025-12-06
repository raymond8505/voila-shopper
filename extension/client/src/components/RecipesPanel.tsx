import { useCallback, useState } from "react"

import Splitter from "antd/es/splitter"
import Collapse from "antd/es/collapse"

import List from "antd/es/list"

import { css } from "@emotion/react"

import { useStore } from "../store"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import { UnstyledButton } from "./common/elements.styles"
import TextArea from "antd/es/input/TextArea"
import type { Recipe } from "../types"
import { useRecipes } from "../hooks/useRecipes"
import { LoaderButton } from "./common/LoaderButton"
import FileTextOutlined from "@ant-design/icons/FileTextOutlined"

export function RecipesPanel() {
	const {
		ingredients,
		removeIngredient,
		setCurrentModalRecipe,
		setRecipeModalOpen,
	} = useStore()
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
				gap: 8px;
				height: 100%;
			`}
		>
			<div
				css={css`
					overflow: auto;
					padding: 8px;
					height: 100%;
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
					<Splitter.Panel min={192}>
						<div
							css={css`
								margin: 8px 0;
							`}
						>
							<strong>Recipes</strong>
							<TextArea
								rows={5}
								placeholder={`Extra recipe criteria, for example "Indian" or "No Dairy"`}
								onChange={(e) => setExtraCriteria(e.target.value)}
							></TextArea>
							<LoaderButton
								loading={recipeRecommendationsLoading}
								type="primary"
								onClick={handleGetRecipesClick}
								css={css`
									margin: 8px 0;
								`}
								label="Get Recipes"
							/>
							<Collapse>
								{recipes?.map((recipe) => {
									console.log({ recipe })
									return (
										<Collapse.Panel
											header={recipe.recipe.Name as string}
											key={recipe.recipe.Name as string}
											extra={
												<UnstyledButton
													onClick={(e) => {
														e.preventDefault()
														e.stopPropagation()
														setCurrentModalRecipe(recipe.recipe)
														setRecipeModalOpen(true)
													}}
													title="View Full Recipe"
												>
													<FileTextOutlined />
												</UnstyledButton>
											}
										>
											<div>Used: {recipe.ingredients_used as string}</div>
											<div>Needed: {recipe.ingredients_needed as string}</div>
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
