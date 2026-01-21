import Alert from "antd/es/alert/Alert"
import { PriceTrackerRule } from "./PriceTrackerRule/PriceTrackerRule"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { useCallback, useEffect, useState } from "react"
import { PriceTracker } from "@src/types/product/price-tracker"
import Collapse from "antd/es/collapse/Collapse"
import CaretDownOutlined from "@ant-design/icons/CaretDownOutlined"
import { css } from "@emotion/react"
import { ConfigProvider } from "antd"
import { MatchTable } from "./PriceTrackerRule/MatchTable"

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
				(r) => r.matches === undefined,
			)

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
		async (rule: PriceTracker.Rule, reset, mode) => {
			setRuleError(null)
			reset()

			console.log({ rule })

			try {
				const createRuleResp = await createRule(rule)

				setPriceTrackerRules([
					{
						...createRuleResp.rule,
						matches: createRuleResp.products,
					},
					// if we're editing, remove the old rule
					...(mode === "edit"
						? priceTrackerRules.filter((r) => r.id !== rule.id)
						: priceTrackerRules),
				])
			} catch (e) {
				setRuleError(
					(e as Error).message || "Unknown error creating rule",
				)
			}
		},
		[
			setRuleError,
			createRule,
			setPriceTrackerRules,
			priceTrackerRules,
		],
	)

	const ruleItems = priceTrackerRules.map((rule, i) => ({
		key: rule.id,
		label: (
			<PriceTrackerRule
				rule={rule}
				key={i}
				onSubmit={handleCreatePriceTrackerSubmit}
				mode="edit"
			/>
		),
		children: <MatchTable matches={rule.matches} />,
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
			<div
				css={css`
					display: grid;
					grid-template-columns: 1fr;
					grid-template-rows: auto 1fr;
					height: 100%;
				`}
			>
				<PriceTrackerRule
					editing={true}
					loading={createRuleLoading}
					onSubmit={handleCreatePriceTrackerSubmit}
					showHelp
					mode="create"
				/>
				<div
					css={css`
						overflow: auto;
					`}
				>
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
						<Collapse
							items={ruleItems}
							collapsible={"icon"}
							expandIcon={(panelProps) => (
								<CaretDownOutlined
									style={{
										transform: panelProps.isActive
											? "rotate(-90deg)"
											: undefined,
									}}
								/>
							)}
						></Collapse>
					</div>
				</div>
			</div>
		</ConfigProvider>
	)
}
