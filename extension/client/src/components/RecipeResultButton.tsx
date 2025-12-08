import { decodeHtmlEntities } from "../helpers"
import { useStore } from "../store"
import { Recipe } from "../types/index"
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
			{decodeHtmlEntities(recipe.name)}
		</UnstyledButton>
	)
}
