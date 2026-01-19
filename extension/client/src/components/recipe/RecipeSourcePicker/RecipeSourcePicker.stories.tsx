import { fn } from "storybook/test"
import { RecipeSourcePicker } from "./RecipeSourcePicker"

export default {
	component: RecipeSourcePicker,
	title: "Client/recipe/RecipeSourcePicker",
	args: {
		onChange: fn(),
	},
}

export const Default = {}
