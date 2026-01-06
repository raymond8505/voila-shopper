import Alert from "antd/es/alert/Alert"
import { PriceTracker } from "./PriceTracker"

export function ProductsPanel() {
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
				<PriceTracker editing={true} onSubmit={(rule) => {
                    console.log(rule)
                }} />
			</fieldset>
		</div>
	)
}
