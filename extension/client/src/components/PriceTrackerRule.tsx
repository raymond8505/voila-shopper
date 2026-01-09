import { css } from "@emotion/react"
import type { PriceTracker as IPriceTracker } from "@src/types/product/price-tracker"
import { Form, Input, InputNumber, Select, Tooltip } from "antd"
import Space from "antd/es/space"
import { LoaderButton } from "./common/LoaderButton/LoaderButton"
import { useForm } from "antd/es/form/Form"
import { useCallback } from "react"
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined"
import { UnstyledButton } from "./common/elements.styles"
export function PriceTrackerRule({
	rule,
	editing = false,
	onSubmit,
	loading = false,
	showHelp = false,
}: {
	rule?: IPriceTracker.Rule
	editing?: boolean
	onSubmit?: (
		rule: IPriceTracker.Rule,
		resetFields: (fields?: any[] | undefined) => void
	) => void
	loading?: boolean
	showHelp?: boolean
}) {
	const buttonLabel = editing
		? rule === undefined
			? "Create"
			: "Edit"
		: "Edit"

	const [form] = useForm()

	const handleSubmit = useCallback(() => {
		form.validateFields().then((fields) => {
			onSubmit?.(fields as IPriceTracker.Rule, form.resetFields)
		})
	}, [form, onSubmit])

	return (
		<Form form={form}>
			<div></div>
			<div
				css={css`
					display: flex;
					flex-wrap: wrap;
					justify-content: ${editing
						? "space-between"
						: "flex-start"};
					gap: ${editing ? "8px" : ".2em"};
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					padding-bottom: 8px;
					margin-bottom: 16px;

					> * {
						// only grow when editing
						flex-grow: ${Number(editing)};
					}
				`}
			>
				<div
					css={css`
						width: 100%;
						display: flex;
						align-items: flex-start;
					`}
				>
					{editing ? (
						<>
							<Form.Item
								required
								layout="horizontal"
								name="query"
								help={
									<div
										css={css`
											font-size: 13px;
											line-height: 1;
										`}
									>
										Ex: "Greek yogurt", "3-ply toilet paper",
										"Kraft Dinner"
									</div>
								}
							>
								<Input placeholder="Search Query" />
							</Form.Item>
							{showHelp ? (
								<Tooltip
									placement="right"
									title={`Search for something and add a price, we'll let you know when anything matches.`}
									getPopupContainer={(e) => e}
								>
									<UnstyledButton>
										<QuestionCircleOutlined
											style={{ margin: "10px 0 0 8px" }}
										/>
									</UnstyledButton>
								</Tooltip>
							) : null}
						</>
					) : (
						<div
							css={css`
								font-weight: bold;
								font-size: 1.2em;
								line-height: 1;
							`}
						>
							{rule?.query}
						</div>
					)}
				</div>

				{editing ? (
					<Space.Compact style={{ marginTop: "8px" }}>
						<Form.Item required name="price">
							<InputNumber
								placeholder="Price"
								formatter={(value) => `$${value}`}
							/>
						</Form.Item>
						<Space.Addon>/</Space.Addon>
						<Form.Item name="priceType" required>
							<Select
								options={[
									{
										label: "Package",
										value: "package",
									},
									{
										label: "Unit",
										value: "unit",
									},
								]}
								placeholder="Package"
								getPopupContainer={(e) => e}
							></Select>
						</Form.Item>
					</Space.Compact>
				) : (
					<>
						<strong>${rule?.price}</strong>
						<span>or less</span>
					</>
				)}

				{editing ? (
					<div css={css``}>
						<LoaderButton
							type="primary"
							htmlType="button"
							onClick={handleSubmit}
							label={buttonLabel}
							loading={loading}
						/>
					</div>
				) : null}
			</div>
		</Form>
	)
}
