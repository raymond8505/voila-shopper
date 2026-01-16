import Alert from "antd/es/alert/Alert"
import { PriceTrackerRule } from "./PriceTrackerRule"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { useCallback, useEffect, useState } from "react"
import { PriceTracker } from "@src/types/product/price-tracker"
import Collapse from "antd/es/collapse/Collapse"
import LinkOutlined from "@ant-design/icons/LinkOutlined"
import { css } from "@emotion/react"
import { ConfigProvider, Table } from "antd"

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
		PriceTracker.RuleWithEmbedding[] | null
	>([])

	useEffect(() => {
		let rulesWithoutMatches: PriceTracker.Rule[] = []

		if (!latestMatchesLoading && latestMatches?.length === 0) {
			rulesWithoutMatches = priceTrackerRules.filter(
				(r) => r.matches === undefined
			)

			console.log({
				latestMatches,
				latestMatchesLoading,
				rulesWithoutMatches,
			})

			getLatestMatches(rulesWithoutMatches)
				.then((rules) => {
					console.log("returned rules", rules)

					if (rules) {
						setLatestMatches(rules)
					}
				})
				.catch((e) => {
					setLatestMatches(null)
					console.error("error getting latest matches", e)
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

			try {
				const createRuleResp = await createRule(rule)

				setPriceTrackerRules([
					{
						...createRuleResp.rule,
						matches: createRuleResp.products,
					},
					...priceTrackerRules,
				])
			} catch (e) {
				setRuleError(
					(e as Error).message || "Unknown error creating rule"
				)
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
			<Table
				dataSource={
					rule.matches?.map((match, j) => ({
						price: `$${match.product_view.best_current_price.price?.toFixed(
							2
						)}`,
						name: match.product_view.product.raw_name,
						match,
						key: match.product_view.product.id + "-" + j,
					})) ?? []
				}
				pagination={{
					pageSize: 5,
				}}
				columns={[
					{
						title: "Price",
						dataIndex: "price",
						render: (_: any, record: any) => {
							return <strong>{record.price}</strong>
						},
					},
					{
						title: "Product Name",
						dataIndex: "name",
					},
					{
						title: "Visit",
						dataIndex: "visit",
						render: (_: any, record: any) => {
							return record.match.product_view.best_current_price
								.source_product_url ? (
								<a
									href={
										new URL(
											record.match.product_view.best_current_price.source_product_url
										).pathname
									}
								>
									<LinkOutlined />
								</a>
							) : null
						},
					},
				]}
			></Table>
		),
	}))
	return (
		<ConfigProvider
			theme={{
				components: {
					Table: {
						fontSize: 12,
						cellPaddingBlock: 4,
					},
					Pagination: {
						fontSize: 12,
						itemSize: 20,
					},
					Collapse: {
						contentPadding: 4,
					},
				},
			}}
		>
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
						title="Rule Error"
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
		</ConfigProvider>
	)
}
