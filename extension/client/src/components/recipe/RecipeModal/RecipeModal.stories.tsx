import { RecipeModal } from "./RecipeModal"
import { useStore } from "../../../store/client"
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
				setCurrentModalRecipe({
					schema: recipe,
					url: "https://example.com/recipe",
					source: "Example Source",
					loc: { lines: [{ from: "1", to: "10" }] },
					blobType: "text/html",
				})
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
