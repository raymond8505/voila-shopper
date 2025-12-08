import { create } from "zustand"
import { Recipe, Voila } from "../types"
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
	drawerOpen: boolean
	setDrawerOpen: (val: boolean) => void
	recipeModalOpen: boolean
	setRecipeModalOpen: (val: boolean) => void
	currentModalRecipe?: Recipe.Recipe
	setCurrentModalRecipe: (val: Recipe.Recipe) => void
	recipeCriteria: string
	setRecipeCriteria: (criteria: string) => void
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
			drawerOpen: localStorageStore?.drawerOpen ?? true,
			setDrawerOpen: (val) =>
				set({
					drawerOpen: val,
				}),
			currentModalRecipe: undefined,
			setCurrentModalRecipe: (val: Recipe.Recipe) =>
				set({
					currentModalRecipe: val,
				}),
			recipeModalOpen: false,
			setRecipeModalOpen: (val: boolean) => set({ recipeModalOpen: val }),
			recipeCriteria: localStorageStore?.recipeCriteria ?? "",
			setRecipeCriteria: (criteria: string) =>
				set({ recipeCriteria: criteria }),
		})
	)
)

useStore.subscribe(
	(state) => ({
		ingredients: state.ingredients,
		includeCriteria: state.includeCriteria,
		excludeCriteria: state.excludeCriteria,
		drawerOpen: state.drawerOpen,
		recipeCriteria: state.recipeCriteria,
	}),
	setLocalStorageStore
)
