import { useCallback, useState } from "react"
import Splitter from "antd/es/splitter"
import { css } from "@emotion/react"
import { useStore } from "@store/client"
import TextArea from "antd/es/input/TextArea"
import type { Recipe } from "../types"
import { useRecipes } from "../hooks/useRecipes"
import { RecipeResultButton } from "./RecipeResultButton"
import { isWorkflowError } from "../types/helpers"
import { Alert, Flex, Tooltip } from "antd"
import {
	GetRecipesButton,
	RecipeResultsList,
	RecipeResultsWrapper,
	Wrapper,
} from "./RecipesPanel.styles"
import { RecipeSourcePicker } from "./recipe/RecipeSourcePicker/RecipeSourcePicker"
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined"
import { UnstyledButton } from "./common/elements.styles"
import { Help } from "./common/Help"

export function RecipesPanel() {
	const { recipeCriteria, setRecipeCriteria } = useStore()
	const [recipes, setRecipes] =
		useState<Recipe.ApiResponse["recipeSchemas"]>()
	const [errorText, setErrorText] = useState<string | null>(null)
	const [recipeSources, setRecipeSources] = useState<
		Recipe.Source["source"][]
	>([])
	const {
		generateRecipeRecommendations,
		recipeRecommendationsLoading,
	} = useRecipes()

	const handleGetRecipesClick = useCallback(() => {
		setErrorText(null)
		generateRecipeRecommendations({
			extraCriteria: recipeCriteria,
			sources: recipeSources,
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
					setRecipes(
						(resp as Recipe.ApiResponse).recipeSchemas ?? []
					)
				}
			}
		})
	}, [
		setRecipes,
		recipeCriteria,
		setErrorText,
		generateRecipeRecommendations,
		recipeSources,
	])

	return (
		<Wrapper>
			<div>
				<Splitter orientation="vertical">
					<Splitter.Panel min={192} style={{ padding: "8px" }}>
						<div>
							<TextArea
								rows={15}
								placeholder={`ex: "Indian", "No Dairy", "Chicken, rice, Greek yogurt", "under 30 minutes"`}
								onChange={(e) => {
									setRecipeCriteria(e.target.value)
								}}
								defaultValue={recipeCriteria}
								style={{ marginBottom: 8 }}
							></TextArea>

							<RecipeSourcePicker onChange={setRecipeSources} />

							<RecipeResultsWrapper>
								<Flex
									justify="flex-end"
									align="center"
									gap={"8px"}
								>
									<GetRecipesButton
										loading={recipeRecommendationsLoading}
										type="primary"
										onClick={handleGetRecipesClick}
										label="Find Recipes"
									/>
									<Help text="Search for recipes by anything- ingredients, cuisine, time, diet, meal type, etc" />
								</Flex>
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
								{recipes?.map((recipeMeta) => (
									<li
										key={`recipe-${encodeURIComponent(
											recipeMeta.schema.name
										)}`}
									>
										<RecipeResultButton
											recipeMeta={recipeMeta}
										/>
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
