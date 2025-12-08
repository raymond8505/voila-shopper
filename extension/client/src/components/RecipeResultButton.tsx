import { useStore } from "../store"
import { Recipe } from "../types"
import { UnstyledButton } from "./common/elements.styles"

export function RecipeResultButton({ recipe }: { recipe: Recipe.Recipe }) {
	const { setCurrentModalRecipe, setRecipeModalOpen } = useStore()
	return (
		<UnstyledButton
			onClick={(e) => {
				setCurrentModalRecipe(recipe)
				setRecipeModalOpen(true)
			}}
		>
			{recipe.name}
		</UnstyledButton>
	)
}
