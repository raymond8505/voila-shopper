import { useCallback } from "react"
import { useWorkflow } from "./useWorkflow"
import { PriceTracker } from "@src/types/product/price-tracker"
import { useStore as useProductStore } from "@store/products"
import { rulesAreEqual } from "@src/helpers"

export function usePriceTracker() {
	const {
		call: callCreatePriceTrackerRule,
		loading: createRuleLoading,
	} = useWorkflow<PriceTracker.CreateRuleResponse>({
		url: import.meta.env.VITE_WORKFLOW_CREATE_PRICE_TRACKER_RULE,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

	const {
		call: getRuleMatches,
		loading: getLatestMatchesLoading,
	} = useWorkflow<{
		rules: PriceTracker.RuleWithEmbedding[]
	}>({
		url: import.meta.env
			.VITE_WORKFLOW_GET_PRICE_TRACKER_RULE_MATCHES,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

	const {
		priceTrackerRules,
		setPriceTrackerRules,
		deletePriceTrackerRule,
	} = useProductStore()

	const getLatestMatches = useCallback(
		async (rules: PriceTracker.Rule[]) => {
			if (rules.length === 0) {
				return
			}
			const response = await getRuleMatches({
				payload: { rules },
				hookOptions: {
					method: "POST",
				},
			})

			const newRules = [...priceTrackerRules].map((r) => {
				return {
					...r,
					matches: [],
				} as unknown as PriceTracker.RuleWithEmbedding
			})
			response.rules.map((newRule) => {
				if (!newRule.matches) {
					newRule.matches = []
				}
				const existingRuleIndex = newRules.findIndex((r) =>
					rulesAreEqual(r, newRule)
				)

				if (existingRuleIndex !== -1) {
					newRules[existingRuleIndex] = newRule
				}
			})

			setPriceTrackerRules(newRules)

			return newRules
		},
		[getRuleMatches, setPriceTrackerRules, priceTrackerRules]
	)

	const createRule = useCallback(
		async (newRule: PriceTracker.Rule) => {
			return await callCreatePriceTrackerRule<PriceTracker.Rule>(
				{
					payload: newRule,
					hookOptions: {
						method: "POST",
					},
				}
			)
		},
		[callCreatePriceTrackerRule]
	)

	return {
		createRule,
		deleteRule: deletePriceTrackerRule,
		createRuleLoading,
		priceTrackerRules,
		setPriceTrackerRules,
		getLatestMatches,
		latestMatchesLoading: getLatestMatchesLoading,
	}
}
