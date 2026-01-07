import Alert from "antd/es/alert/Alert"
import { PriceTracker } from "./PriceTracker"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { isWorkflowError } from "@src/types/helpers"
import { useState } from "react"

export function ProductsPanel() {
	const { createRule, createRuleLoading } = usePriceTracker()
	const [ruleError, setRuleError] = useState<string | null>(null)
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
						const createRuleResp = await createRule(rule)

						if (isWorkflowError(createRuleResp)) {
							setRuleError(
								JSON.parse(createRuleResp.message).error
							)
						} else {
							setRuleError(null)
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
		</div>
	)
}
