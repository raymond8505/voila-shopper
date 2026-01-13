import Alert from "antd/es/alert/Alert"
import { PriceTrackerRule } from "./PriceTrackerRule"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { isWorkflowError } from "@src/types/helpers"
import { useCallback, useEffect, useState } from "react"
import { PriceTracker } from "@src/types/product/price-tracker"
import Collapse from "antd/es/collapse/Collapse"
import { css } from "@emotion/react"

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

	const ruleItems = priceTrackerRules.map((rule, i) => ({
		label: (
			<PriceTrackerRule
				rule={rule}
				key={i}
				onSubmit={handleCreatePriceTrackerSubmit}
			/>
		),
		showArrow: false,
		children: (
			<ul>
				{rule.matches?.map((match, j) => (
					<li key={j}>
						{match.product.metadata.raw_input.product.name}
					</li>
				))}
			</ul>
		),
	}))
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
			<div
				css={css`
					margin-top: 16px;
				`}
			>
				<Collapse items={ruleItems}></Collapse>
			</div>
		</div>
	)
}
