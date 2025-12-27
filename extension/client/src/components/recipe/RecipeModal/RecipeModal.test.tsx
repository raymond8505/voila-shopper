import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, expect, vi, beforeEach } from "vitest"
import { RecipeModal } from "./RecipeModal"
import { useStore } from "../../../store/client"
import { Recipe } from "../../../types"

// Mock the store to control its state within tests
vi.mock("../../../store", () => ({
	useStore: vi.fn(),
}))

// Mock the helper to simplify assertions
vi.mock(import("../../../helpers"), async (importOriginal) => {
	const actual = await importOriginal()

	return {
		...actual,
		decodeHtmlEntities: (html: string) => html, // Just return the string as is
	}
})

const mockSetRecipeModalOpen = vi.fn()

const mockRecipe: Recipe.Recipe = {
	"@type": "Recipe",
	name: "Test Recipe & Name",
	description: "A delicious test recipe for testing purposes.",
	image: "https://example.com/test-recipe.jpg",
	prepTime: "PT15M", // ISO 8601 duration format
	cookTime: "PT30M",
	recipeYield: "4 servings",
	recipeIngredient: ["1 cup of flour", "2 eggs"],
	recipeInstructions: [
		{ type: "HowToStep", text: "Mix flour and eggs." },
		{ type: "HowToStep", text: "Bake at 350." },
	],
	nutrition: {
		"@type": "NutritionInformation",
		calories: "500",
		fatContent: "20g",
		saturatedFatContent: "5g",
		cholesterolContent: "180mg",
		sodiumContent: "150mg",
		carbohydrateContent: "50g",
		fiberContent: "2g",
		sugarContent: "10g",
		proteinContent: "10g",
	},
}

describe("RecipeModal", () => {
	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks()
		// Default mock state: modal is open with a recipe
		vi.mocked(useStore).mockReturnValue({
			recipeModalOpen: true,
			currentModalRecipe: mockRecipe,
			setRecipeModalOpen: mockSetRecipeModalOpen,
		})
	})

	test("renders nothing when recipeModalOpen is false", () => {
		// Override default mock for this specific test
		vi.mocked(useStore).mockReturnValue({
			recipeModalOpen: false,
			currentModalRecipe: null,
			setRecipeModalOpen: mockSetRecipeModalOpen,
		})

		render(<RecipeModal />)

		// The modal title should not be in the document
		expect(
			screen.queryByText(mockRecipe.name as string)
		).not.toBeInTheDocument()
	})

	test("renders the modal with recipe details when open", () => {
		render(<RecipeModal />)

		// Check for title
		expect(
			screen.getByText(mockRecipe.name as string)
		).toBeInTheDocument()

		// Check for ingredients
		expect(screen.getByText("Ingredients")).toBeInTheDocument()
		expect(
			screen.getByText("1 cup of flour")
		).toBeInTheDocument()
		expect(screen.getByText("2 eggs")).toBeInTheDocument()

		// Check for instructions
		expect(screen.getByText("Instructions")).toBeInTheDocument()
		expect(
			screen.getByText("Mix flour and eggs.")
		).toBeInTheDocument()

		expect(screen.getByText("500")).toBeInTheDocument()
	})

	test("does not render time sections if times are undefined", () => {
		const recipeWithoutTimes: Recipe.Recipe = {
			...mockRecipe,
			prepTime: undefined,
			cookTime: undefined,
		}

		// Override default mock to use the recipe without time properties
		vi.mocked(useStore).mockReturnValue({
			recipeModalOpen: true,
			currentModalRecipe: recipeWithoutTimes,
			setRecipeModalOpen: mockSetRecipeModalOpen,
		})

		render(<RecipeModal />)

		// The time sections should not be in the document
		expect(
			screen.queryByText("Prep Time")
		).not.toBeInTheDocument()
		expect(
			screen.queryByText("Cook Time")
		).not.toBeInTheDocument()
	})

	test("calls setRecipeModalOpen with false when the modal is closed", async () => {
		render(<RecipeModal />)
		const user = userEvent.setup()

		const closeButton = screen.getByRole("button", {
			name: /close/i,
		})
		await user.click(closeButton)

		expect(mockSetRecipeModalOpen).toHaveBeenCalledWith(false)
		expect(mockSetRecipeModalOpen).toHaveBeenCalledTimes(1)
	})
})
