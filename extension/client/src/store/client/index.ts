import { create } from "zustand"
import { Recipe } from "../../types"
import { subscribeWithSelector } from "zustand/middleware"
import {
	getLocalStorageStore,
	setLocalStorageStore,
} from "../helpers"
export interface Store {
	includeCriteria: string
	setIncludeCriteria: (criteria: string) => void
	excludeCriteria: string
	setExcludeCriteria: (criteria: string) => void
	drawerOpen: boolean
	setDrawerOpen: (val: boolean) => void
	recipeModalOpen: boolean
	setRecipeModalOpen: (val: boolean) => void
	currentModalRecipe?: Recipe.RecipeMetadata
	setCurrentModalRecipe: (val: Recipe.RecipeMetadata) => void
	recipeCriteria: string
	setRecipeCriteria: (criteria: string) => void
	workflowLiveMode: boolean
	setWorkflowLiveMode: (val: boolean) => void
}

const localStorageStore = getLocalStorageStore()
export const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		includeCriteria:
			localStorageStore?.client?.includeCriteria ?? "",
		setIncludeCriteria: (criteria) =>
			set({ includeCriteria: criteria }),
		excludeCriteria:
			localStorageStore?.client?.excludeCriteria ?? "",
		setExcludeCriteria: (criteria) =>
			set({ excludeCriteria: criteria }),
		drawerOpen: localStorageStore?.client?.drawerOpen ?? true,
		setDrawerOpen: (val) =>
			set({
				drawerOpen: val,
			}),
		currentModalRecipe: undefined,
		setCurrentModalRecipe: (val) =>
			set({
				currentModalRecipe: val,
			}),
		recipeModalOpen: false,
		setRecipeModalOpen: (val) => set({ recipeModalOpen: val }),
		recipeCriteria:
			localStorageStore?.client?.recipeCriteria ?? "",
		setRecipeCriteria: (criteria) =>
			set({ recipeCriteria: criteria }),
		workflowLiveMode:
			localStorageStore?.client?.workflowLiveMode ?? false,
		setWorkflowLiveMode: (val) => set({ workflowLiveMode: val }),
	}))
)

useStore.subscribe(
	(state) => ({
		includeCriteria: state.includeCriteria,
		excludeCriteria: state.excludeCriteria,
		drawerOpen: state.drawerOpen,
		recipeCriteria: state.recipeCriteria,
		workflowLiveMode: state.workflowLiveMode,
	}),
	(state) => setLocalStorageStore(state, "client")
)
