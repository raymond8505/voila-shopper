import { fn } from "storybook/test"
import { RecipeSourcePicker } from "./RecipeSourcePicker"

export default {
	component: RecipeSourcePicker,
	title: "recipe/RecipeSourcePicker",
	args: {
		onChange: fn(),
	},
}

export const Default = {}
