import { RecipeModal } from "./RecipeModal"
import { useStore } from "@store/client"
import { useEffect } from "react"
import { Recipe } from "../../../types/recipe/index"
import { recipe } from "../fixtures/index"
import { supabaseRequest } from "@src/api/supabase"
export default {
	title: "recipe/RecipeModal",
	component: RecipeModal,
	decorators: [
		(Story, { parameters }) => {
			const { setRecipeModalOpen, setCurrentModalRecipe } =
				useStore()

			useEffect(() => {
				if (parameters.recipeId) {
					supabaseRequest({
						table: "recipes_embedding",
						tableParams: {
							id: `eq.${parameters.recipeId}`,
						},
					}).then(async (resp) => {
						const recipeJSON: {
							metadata: Recipe.RecipeMetadata
						}[] = await resp.json()

						const recipe = recipeJSON?.[0].metadata

						if (recipe) {
							setCurrentModalRecipe(recipe)
							setRecipeModalOpen(true)
						}
					})
				} else {
					setCurrentModalRecipe({
						schema: recipe,
					} as unknown as Recipe.RecipeMetadata)
					setRecipeModalOpen(true)
				}
			}, [setRecipeModalOpen, parameters])
			return (
				<>
					<button
						onClick={() => {
							setRecipeModalOpen(true)
						}}
					>
						Open Recipe Modal
					</button>
					<Story />
				</>
			)
		},
	],
}

export const Default = {}

export const WithInstructionSections = {
	parameters: {
		recipeId: 183489,
	},
}
