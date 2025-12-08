import { useCallback, useState } from "react"

import Splitter from "antd/es/splitter"

import List from "antd/es/list"

import { css } from "@emotion/react"

import { useStore } from "../store"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import { UnstyledButton } from "./common/elements.styles"
import TextArea from "antd/es/input/TextArea"
import type { Recipe } from "../types/index"
import { useRecipes } from "../hooks/useRecipes"
import { LoaderButton } from "./common/LoaderButton"
import { RecipeResultButton } from "./RecipeResultButton"
import { isWorkflowError } from "../types/guards"
import { Alert } from "antd"

export function RecipesPanel() {
	const { ingredients, removeIngredient, recipeCriteria, setRecipeCriteria } =
		useStore()
	const [recipes, setRecipes] = useState<Recipe.ApiResponse["recipeSchemas"]>()
	const [errorText, setErrorText] = useState<string | null>(null)
	const { generateRecipeRecommendations, recipeRecommendationsLoading } =
		useRecipes()

	const handleGetRecipesClick = useCallback(() => {
		setErrorText(null)
		generateRecipeRecommendations({
			ingredients,
			extraCriteria: recipeCriteria,
		}).then((resp) => {
			if (resp) {
				if (isWorkflowError(resp)) {
					setErrorText(() => {
						switch (resp.status) {
							case 403:
								return "Incorrect username or password"
							case 404:
								return "Workflow not found"
							default:
								return resp.message
						}
					})
				} else {
					setErrorText(null)
					setRecipes((resp as Recipe.ApiResponse).recipeSchemas ?? [])
				}
			}
		})
	}, [
		setRecipes,
		ingredients,
		recipeCriteria,
		setErrorText,
		generateRecipeRecommendations,
	])

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
					<Splitter.Panel min={188} defaultSize={208}>
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
					<Splitter.Panel min={192} style={{ padding: "8px" }}>
						<div
							css={css`
								margin: 8px 0;
							`}
						>
							<strong>Recipes</strong>
							<TextArea
								rows={25}
								placeholder={`Extra recipe criteria, for example "Indian" or "No Dairy"`}
								onChange={(e) => {
									setRecipeCriteria(e.target.value)
								}}
								defaultValue={recipeCriteria}
							></TextArea>
							<div
								css={css`
									display: flex;
									gap: 8px;
									flex-wrap: no-wrap;
								`}
							>
								<LoaderButton
									loading={recipeRecommendationsLoading}
									type="primary"
									onClick={handleGetRecipesClick}
									css={css`
										margin: 8px 0;
									`}
									label="Get Recipes"
								/>
								<div
									css={css`
										padding: 8px 0;
									`}
								>
									{errorText ? (
										<Alert message={errorText} type="error" />
									) : null}
								</div>
							</div>
							<ul
								css={css`
									font-weight: bold;

									li {
										padding: 8px;
										border-bottom: 1px solid rgba(0, 0, 0, 0.2);
									}
								`}
							>
								{recipes?.map((recipe) => (
									<li key={`recipe-${encodeURIComponent(recipe.name)}`}>
										<RecipeResultButton recipe={recipe} />
									</li>
								))}
							</ul>
						</div>
					</Splitter.Panel>
				</Splitter>
			</div>
		</div>
	)
}
