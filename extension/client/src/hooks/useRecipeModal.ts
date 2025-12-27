import { useStore } from "@store/client"

export function useRecipeModal() {
	const {
		setCurrentModalRecipe: setRecipe,
		currentModalRecipe: recipe,
		recipeModalOpen: open,
		setRecipeModalOpen: setOpen,
	} = useStore()

	return {
		recipe,
		setRecipe,
		open,
		setOpen,
	}
}
