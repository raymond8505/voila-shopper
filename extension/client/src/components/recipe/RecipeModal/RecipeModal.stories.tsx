import { RecipeModal } from "./RecipeModal"
import { useStore } from "../../../store"
import { useEffect } from "react"
import { recipe } from "../fixtures"
export default {
	title: "recipe/RecipeModal",
	component: RecipeModal,
	decorators: [
		(Story) => {
			const { setRecipeModalOpen, setCurrentModalRecipe } =
				useStore()

			useEffect(() => {
				setCurrentModalRecipe(recipe)
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
