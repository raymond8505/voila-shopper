import { decodeHtmlEntities } from "../helpers"
import { useStore } from "@store/client"
import { Recipe } from "../types/index"
import { UnstyledButton } from "./common/elements.styles"

export function RecipeResultButton({
	recipeMeta,
}: {
	recipeMeta: Recipe.RecipeMetadata
}) {
	const { setCurrentModalRecipe, setRecipeModalOpen } =
		useStore()
	return (
		<UnstyledButton
			onClick={() => {
				setCurrentModalRecipe(recipeMeta)
				setRecipeModalOpen(true)
			}}
		>
			{decodeHtmlEntities(recipeMeta.schema.name)}
		</UnstyledButton>
	)
}
