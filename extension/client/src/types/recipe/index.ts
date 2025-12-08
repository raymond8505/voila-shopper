import Schema from "schema-dts"
export namespace Recipe {
	export type Recipe = Omit<
		Schema.WithContext<Schema.Recipe>,
		"recipeIngredient" | "name" | "recipeInstructions" | "nutrition"
	> & {
		recipeIngredient: string[]
		recipeInstructions: { type: string; text: string }[]
		name: string
		nutrition: NutritionInformation
	}

	export interface ApiResponse {
		recipeSchemas: Recipe[]
	}

	export interface NutritionInformation {
		// New interface for NutritionInformation
		"@type": "NutritionInformation"
		calories: string
		fatContent: string
		saturatedFatContent: string
		cholesterolContent: string
		sodiumContent: string
		carbohydrateContent: string
		fiberContent: string
		sugarContent: string
		proteinContent: string
	}
}
