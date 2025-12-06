import { useStore } from "../store"

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
