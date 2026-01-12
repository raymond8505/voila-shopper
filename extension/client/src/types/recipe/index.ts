import Schema from "schema-dts"

export namespace Recipe {
	export type Source = { source: string; recipe_count: number }
	export type Recipe = Omit<
		Schema.Recipe,
		"recipeInstructions" | "nutrition"
	> & {
		recipeIngredient: string[]
		recipeInstructions: (HowToSection | HowToStep)[]
		name: string
		nutrition?: NutritionInformation
		prepTime?: string
		cookTime?: string
		totalTime?: string
		recipeYield: string
	}

	export type HowToSection = Omit<
		Schema.HowToSection,
		"name" | "itemListElement"
	> & {
		name?: string
		itemListElement?: HowToStep[]
	}

	export type HowToStep = Omit<Schema.HowToStep, "text"> & {
		"@type"?: string
		text?: string
	}

	export interface RecipeMetadata {
		schema: Recipe
		url: string
		source: string
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
