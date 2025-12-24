import { useCallback } from "react"
import { Recipe, Voila } from "../types/index"
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
			ingredients,
			extraCriteria,
			sources = [],
		}: {
			ingredients: Voila.Product[]
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
					ingredients: ingredients.map((ingredient) => {
						return [
							"productId",
							"name",
							"packageSizeDescription",
							"price",
							"promoPrice",
							"unitPrice",
							"promoUnitPrice",
							"categoryPath",
						].reduce((acc, key) => {
							acc[key] = ingredient[key]
							return acc
						}, {})
					}),
				},
			}),

		[callRecommendationsWorkflow]
	)

	return {
		generateRecipeRecommendations,
		recipeRecommendationsLoading,
	}
}
