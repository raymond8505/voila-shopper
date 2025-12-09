import { useCallback, useEffect, useState } from "react"
import Splitter from "antd/es/splitter"
import List from "antd/es/list"
import { css } from "@emotion/react"
import { useStore } from "../store"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import { UnstyledButton } from "./common/elements.styles"
import TextArea from "antd/es/input/TextArea"
import type { Recipe } from "../types"
import { useRecipes } from "../hooks/useRecipes"
import { RecipeResultButton } from "./RecipeResultButton"
import { isWorkflowError } from "../types/helpers"
import Alert from "antd/es/alert"
import {
	GetRecipesButton,
	RecipeResultsList,
	RecipeResultsWrapper,
	Wrapper,
} from "./RecipesPanel.styles"

export function RecipesPanel() {
	const { ingredients, removeIngredient, recipeCriteria, setRecipeCriteria } =
		useStore()
	const [recipes, setRecipes] = useState<Recipe.ApiResponse["recipeSchemas"]>()
	const [errorText, setErrorText] = useState<string | null>(null)
	const {
		generateRecipeRecommendations,
		recipes: foundRecipes,
		recipeRecommendationsPending,
	} = useRecipes()

	useEffect(() => {
		if (!foundRecipes) return

		if (isWorkflowError(foundRecipes)) {
			setErrorText(foundRecipes.message)
		} else {
			setRecipes(foundRecipes.recipeSchemas)
		}
	}, [foundRecipes, setRecipes, setErrorText])
	const handleGetRecipesClick = useCallback(() => {
		setErrorText(null)
		generateRecipeRecommendations({
			ingredients,
			extraCriteria: recipeCriteria,
		})
	}, [
		setRecipes,
		ingredients,
		recipeCriteria,
		setErrorText,
		generateRecipeRecommendations,
	])

	return (
		<Wrapper>
			<div>
				<Splitter layout="vertical">
					<Splitter.Panel min={188} defaultSize={208}>
						<div style={{ padding: "8px 0" }}>
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
						<div style={{ margin: "8px 0" }}>
							<strong>Recipes</strong>
							<TextArea
								rows={15}
								placeholder={`Extra recipe criteria, for example "Indian" or "No Dairy"`}
								onChange={(e) => {
									setRecipeCriteria(e.target.value)
								}}
								defaultValue={recipeCriteria}
							></TextArea>
							<RecipeResultsWrapper>
								<GetRecipesButton
									loading={recipeRecommendationsPending}
									type="primary"
									onClick={handleGetRecipesClick}
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
							</RecipeResultsWrapper>
							<RecipeResultsList>
								{recipes?.map((recipe) => (
									<li key={`recipe-${encodeURIComponent(recipe.name)}`}>
										<RecipeResultButton recipe={recipe} />
									</li>
								))}
							</RecipeResultsList>
						</div>
					</Splitter.Panel>
				</Splitter>
			</div>
		</Wrapper>
	)
}
