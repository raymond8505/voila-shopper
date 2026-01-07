import { Product } from "@src/types/product"
import { useCallback } from "react"
import { useWorkflow } from "./useWorkflow"
import { PriceTracker } from "@src/types/product/price-tracker"

export function usePriceTracker() {
	const {
		call: callCreatePriceTrackerRule,
		loading: createRuleLoading,
	} = useWorkflow<
		PriceTracker.CreateRuleResponse<Product.WithPrices>
	>({
		url: import.meta.env.VITE_WORKFLOW_CREATE_PRICE_TRACKER_RULE,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

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
		createRuleLoading,
	}
}
