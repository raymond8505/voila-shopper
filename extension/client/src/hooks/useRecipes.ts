import { useCallback } from "react"
import { Recipe } from "../types/index"
import { useWorkflow } from "./useWorkflow"

export function useRecipes() {
	const {
		call: callRecommendationsWorkflow,
		loading: recipeRecommendationsLoading,
	} = useWorkflow<Recipe.ApiResponse>({
		url: import.meta.env.VITE_WORKFLOW_RECOMMEND_RECIPES,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

	const generateRecipeRecommendations = useCallback(
		({
			extraCriteria,
			sources = [],
		}: {
			extraCriteria?: string
			sources?: Recipe.Source["source"][]
		}) =>
			callRecommendationsWorkflow({
				hookOptions: {
					method: "POST",
				},
				payload: {
					extraCriteria: extraCriteria ?? "",
					sources,
				},
			}),

		[callRecommendationsWorkflow]
	)

	return {
		generateRecipeRecommendations,
		recipeRecommendationsLoading,
	}
}
