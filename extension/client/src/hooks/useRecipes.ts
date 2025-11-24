import { useCallback } from "react"
import { Recipe, Voila } from "../types"
import { useWorkflow } from "./useWorkflow"

export function useRecipes() {
	const {
		call: callRecommendationsWorkflow,
		loading: recipeRecommendationsLoading,
	} = useWorkflow<Recipe.ApiResponse>(
		import.meta.env.VITE_WORKFLOW_RECOMMEND_RECIPES
	)

	const generateRecipeRecommendations = useCallback(
		({
			ingredients,
			extraCriteria,
		}: {
			ingredients: Voila.Product[]
			extraCriteria?: string
		}) =>
			callRecommendationsWorkflow({
				hookOptions: {
					method: "POST",
				},
				payload: {
					extraCriteria: extraCriteria ?? "",
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

		[]
	)

	return {
		generateRecipeRecommendations,
		recipeRecommendationsLoading,
	}
}
