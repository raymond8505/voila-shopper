import { RecipeModal } from "./RecipeModal"
import { useStore } from "@store/client"
import { useEffect } from "react"
import { Recipe } from "../../../types/recipe/index"
import { recipe } from "../fixtures/index"
import { supabaseRequest } from "@src/api/supabase"
export default {
	title: "Client/recipe/RecipeModal",
	component: RecipeModal,
	decorators: [
		(Story, { parameters }) => {
			const { setRecipeModalOpen, setCurrentModalRecipe } =
				useStore()

			useEffect(() => {
				if (parameters.recipeId) {
					supabaseRequest({
						table: "recipes",
						tableParams: {
							id: `eq.${parameters.recipeId}`,
						},
					}).then(async (resp) => {
						const recipeJSON: {
							metadata: Recipe.RecipeMetadata
							source?: string
							url?: string
						}[] = await resp.json()

						const recipe = recipeJSON?.[0].metadata
						recipe.source = recipeJSON?.[0].source ?? ""
						recipe.url = recipeJSON?.[0].url ?? ""

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
		recipeId: "bbbed5f4-6c6e-4b7e-ab60-87d7baea7b05",
	},
}

export const WithoutInstructions = {
	parameters: {
		recipeId: "e3763027-ff0b-444b-9fc9-c63a7adc6963",
	},
}
