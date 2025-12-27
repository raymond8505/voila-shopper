import { RecipeModal } from "./RecipeModal"
import { useStore } from "../../../store"
import { useEffect } from "react"
import { recipe } from "../fixtures"
import { Recipe } from "../../../types/recipe/index"
export default {
	title: "recipe/RecipeModal",
	component: RecipeModal,
	decorators: [
		(Story) => {
			const { setRecipeModalOpen, setCurrentModalRecipe } =
				useStore()

			useEffect(() => {
				setCurrentModalRecipe({
					schema: recipe,
				} as unknown as Recipe.RecipeMetadata)
				setRecipeModalOpen(true)
			}, [setRecipeModalOpen])
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
