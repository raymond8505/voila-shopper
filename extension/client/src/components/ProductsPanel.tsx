import Alert from "antd/es/alert/Alert"
import { PriceTracker } from "./PriceTracker"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { isWorkflowError } from "@src/types/helpers"
import { useState } from "react"
import { PriceTracker as IPriceTracker } from "@src/types/product/price-tracker"

export function ProductsPanel() {
	const { createRule, createRuleLoading } = usePriceTracker()
	const [ruleError, setRuleError] = useState<string | null>(null)
	const [priceRules, setPriceRules] = useState<
		IPriceTracker.Rule[]
	>([])
	return (
		<div>
			<strong>Price Tracking</strong>
			<Alert
				type="info"
				showIcon
				message="Track prices for products you buy regularly"
				description={
					<>
						<p>
							A tracker is a combination of a short search query
							and price rules.
						</p>
						<p>
							If a product matches your query and price
							constraints, it will appear here.
						</p>
					</>
				}
				style={{
					marginBottom: "16px",
					marginTop: "8px",
				}}
			></Alert>
			<fieldset>
				<legend>Add a Price Tracker</legend>
				<PriceTracker
					editing={true}
					loading={createRuleLoading}
					onSubmit={async (rule) => {
						setRuleError(null)

						const createRuleResp = await createRule(rule)

						console.log(createRuleResp)
						if (isWorkflowError(createRuleResp)) {
							setRuleError(
								JSON.parse(createRuleResp.message).error
							)
						} else {
							const { products, rule } = createRuleResp

							setPriceRules((prev) => {
								return [{ ...rule }, ...prev]
							})
						}
					}}
				/>
			</fieldset>
			{ruleError ? (
				<Alert
					type="error"
					message="Rule Error"
					description={ruleError}
				/>
			) : null}
			<div>
				{priceRules.map((rule) => (
					<PriceTracker rule={rule} />
				))}
			</div>
		</div>
	)
}
