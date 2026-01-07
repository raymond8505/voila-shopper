import { Product } from "@src/types/product"
import { useCallback } from "react"
import { useWorkflow } from "./useWorkflow"

export function usePriceTracker() {
	const {
		call: callCreatePriceTrackerRule,
		loading: createRuleLoading,
	} = useWorkflow({
		url: import.meta.env.VITE_WORKFLOW_CREATE_PRICE_TRACKER_RULE,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

	const createRule = useCallback(
		async (newRule: Product.PriceTrackerRule) => {
			const resp =
				await callCreatePriceTrackerRule<Product.PriceTrackerRule>(
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
