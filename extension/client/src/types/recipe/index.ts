import Schema from "schema-dts"

export namespace Recipe {
	export type Source = { source: string; count: number }
	export type Recipe = Omit<
		Schema.Recipe,
		"recipeInstructions" | "nutrition"
	> & {
		recipeIngredient: string[]
		recipeInstructions: { type?: string; text: string }[]
		name: string
		nutrition?: NutritionInformation
		prepTime?: string
		cookTime?: string
		totalTime?: string
		recipeYield: string
	}

	export interface RecipeMetadata {
		schema: Recipe
		url: string
		source: string
		loc: {
			lines: { to: string; from: string }[]
		}
		blobType: string
	}
	export interface ApiResponse {
		recipeSchemas: RecipeMetadata[]
	}

	export interface NutritionInformation {
		// New interface for NutritionInformation
		"@type"?: "NutritionInformation"
		calories?: string
		fatContent?: string
		saturatedFatContent?: string
		cholesterolContent?: string
		sodiumContent?: string
		carbohydrateContent?: string
		fiberContent?: string
		sugarContent?: string
		proteinContent?: string
		unsaturatedFatContent?: string
		servingSize?: string
	}
}
