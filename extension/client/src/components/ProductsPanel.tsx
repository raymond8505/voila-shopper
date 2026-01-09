import Alert from "antd/es/alert/Alert"
import { PriceTrackerRule } from "./PriceTrackerRule"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { isWorkflowError } from "@src/types/helpers"
import { useCallback, useState } from "react"

export function ProductsPanel() {
	const {
		createRule,
		createRuleLoading,
		priceTrackerRules,
		setPriceTrackerRules,
	} = usePriceTracker()
	const [ruleError, setRuleError] = useState<string | null>(null)

	const handleCreatePriceTrackerSubmit = useCallback(
		async (rule, reset) => {
			setRuleError(null)
			reset()

			const createRuleResp = await createRule(rule)

			if (isWorkflowError(createRuleResp)) {
				setRuleError(JSON.parse(createRuleResp.message).error)
			} else {
				setPriceTrackerRules([
					{
						...createRuleResp.rule,
						matches: createRuleResp.products,
					},
					...priceTrackerRules,
				])
			}
		},
		[
			setRuleError,
			createRule,
			setPriceTrackerRules,
			priceTrackerRules,
		]
	)
	return (
		<div>
			<PriceTrackerRule
				editing={true}
				loading={createRuleLoading}
				onSubmit={handleCreatePriceTrackerSubmit}
				showHelp
			/>

			{ruleError ? (
				<Alert
					type="error"
					message="Rule Error"
					description={ruleError}
					closable
				/>
			) : null}
			<div>
				{priceTrackerRules.map((rule, i) => (
					<PriceTrackerRule rule={rule} key={i} />
				))}
			</div>
		</div>
	)
}
