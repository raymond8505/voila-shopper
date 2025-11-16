import { create } from "zustand"
import { Voila } from "../types"

export interface Store {
	ingredients: Voila.Product[]
	setIngredients: (ingredients: Voila.Product[]) => void
	addIngredient: (ingredient: Voila.Product) => void
	removeIngredient: (productId: string) => void
}
export const useStore = create<Store>(
	(set): Store => ({
		ingredients: [],
		setIngredients: (ingredients) =>
			set({
				ingredients,
			}),
		addIngredient: (ingredient) =>
			set((state) => ({
				ingredients: [...state.ingredients, ingredient],
			})),
		removeIngredient: (productId) =>
			set((state) => ({
				ingredients: state.ingredients.filter(
					(ingredient) => ingredient.productId !== productId
				),
			})),
	})
)
