import Alert from "antd/es/alert/Alert"
import { PriceTrackerRule } from "./PriceTrackerRule"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { isWorkflowError } from "@src/types/helpers"
import { useCallback, useEffect, useState } from "react"
import { PriceTracker } from "@src/types/product/price-tracker"

export function ProductsPanel() {
	const {
		createRule,
		createRuleLoading,
		priceTrackerRules,
		setPriceTrackerRules,
		latestMatchesLoading,
		getLatestMatches,
	} = usePriceTracker()

	const [latestMatches, setLatestMatches] = useState<
		PriceTracker.RuleWithEmbedding[]
	>([])

	useEffect(() => {
		let rulesWithoutMatches: PriceTracker.Rule[] = []

		if (!latestMatchesLoading && latestMatches.length === 0) {
			rulesWithoutMatches = priceTrackerRules.filter(
				(r) => r.matches === undefined
			)

			getLatestMatches(rulesWithoutMatches).then((rules) => {
				if (rules && !isWorkflowError(rules)) {
					setLatestMatches(rules)
				}
			})
		}
		console.log({
			priceTrackerRules,
			latestMatchesLoading,
			rulesWithoutMatches,
		})
	}, [
		priceTrackerRules,
		latestMatchesLoading,
		latestMatches,
		setLatestMatches,
	])

	const [ruleError, setRuleError] = useState<string | null>(null)

	const handleCreatePriceTrackerSubmit = useCallback(
		async (rule, reset) => {
			setRuleError(null)
			reset()

			console.log("creating rule", { rule })

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
					<PriceTrackerRule
						rule={rule}
						key={i}
						onSubmit={handleCreatePriceTrackerSubmit}
					/>
				))}
			</div>
		</div>
	)
}
