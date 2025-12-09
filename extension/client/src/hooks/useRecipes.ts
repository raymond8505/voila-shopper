import { useCallback } from "react"
import { Recipe, TrimmedProduct, Voila } from "../types/index"
import { useWorkflow } from "./useWorkflow"

export function useRecipes() {
	const {
		call: callRecommendationsWorkflow,
		pending: recipeRecommendationsPending,
		data: recipeRecommendationsData,
	} = useWorkflow<Recipe.ApiRequestPayload<TrimmedProduct>, Recipe.ApiResponse>(
		{
			url: import.meta.env.VITE_WORKFLOW_RECOMMEND_RECIPES,
			auth: {
				username: import.meta.env.VITE_WORKFLOW_USERNAME,
				password: import.meta.env.VITE_WORKFLOW_PWD,
			},
			responseType: "hook",
		}
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
						].reduce((acc: TrimmedProduct, key: keyof TrimmedProduct) => {
							;(acc[key] as any) = ingredient[key]
							return acc
						}, {} as TrimmedProduct)
					}),
				},
			}),

		[callRecommendationsWorkflow]
	)

	return {
		generateRecipeRecommendations,
		recipeRecommendationsPending,
		recipes: recipeRecommendationsData,
	}
}
