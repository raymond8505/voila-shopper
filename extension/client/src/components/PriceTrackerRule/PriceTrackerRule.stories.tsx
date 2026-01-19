import { PriceTrackerRule } from "./PriceTrackerRule"
import type { PriceTracker as IPriceTracker } from "@src/types/product/price-tracker"
import { fn } from "storybook/test"

const mockRule: IPriceTracker.Rule = {
	id: "rule-1",
	query: "Greek yogurt",
	priceType: "unit",
	priceComparison: "<=",
	price: 5.99,
	isSale: null,
	limit: 3,
	matches: [
		{
			product_view: {} as any,
			similarity: 0.95,
		},
		{
			product_view: {} as any,
			similarity: 0.89,
		},
	],
}

export default {
	component: PriceTrackerRule,
	title: "Client/PriceTrackerRule",
	args: {
		onSubmit: fn(),
	},
}

export const Default = {
	args: {
		rule: mockRule,
	},
}

export const Editing = {
	args: {
		rule: mockRule,
		editing: true,
	},
}

export const EditingLoading = {
	args: {
		rule: mockRule,
		editing: true,
		loading: true,
	},
}

export const CreateMode = {
	args: {
		editing: true,
		mode: "create",
	},
}

export const CreateModeWithHelp = {
	args: {
		editing: true,
		mode: "create",
		showHelp: true,
	},
}

export const NoMatches = {
	args: {
		rule: {
			...mockRule,
			matches: [],
		},
	},
}

export const PackagePriceType = {
	args: {
		rule: {
			...mockRule,
			priceType: "package",
			query: "Kraft Dinner",
			price: 2.49,
		},
	},
}
