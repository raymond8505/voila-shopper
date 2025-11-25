import { create } from "zustand"
import { Voila } from "../types"
import { subscribeWithSelector } from "zustand/middleware"
import { getLocalStorageStore, setLocalStorageStore } from "./helpers"
export interface Store {
	ingredients: Voila.Product[]
	setIngredients: (ingredients: Voila.Product[]) => void
	addIngredient: (ingredient: Voila.Product) => void
	removeIngredient: (productId: string) => void
	includeCriteria: string
	setIncludeCriteria: (criteria: string) => void
	excludeCriteria: string
	setExcludeCriteria: (criteria: string) => void
}

const localStorageStore = getLocalStorageStore()
export const useStore = create<Store>()(
	subscribeWithSelector(
		(set): Store => ({
			ingredients: localStorageStore?.ingredients ?? [],

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
			includeCriteria: localStorageStore?.includeCriteria ?? "",
			setIncludeCriteria: (criteria) => set({ includeCriteria: criteria }),
			excludeCriteria: localStorageStore?.excludeCriteria ?? "",
			setExcludeCriteria: (criteria) => set({ excludeCriteria: criteria }),
		})
	)
)

useStore.subscribe(
	(state) => ({
		ingredients: state.ingredients,
		includeCriteria: state.includeCriteria,
		excludeCriteria: state.excludeCriteria,
	}),
	setLocalStorageStore
)
