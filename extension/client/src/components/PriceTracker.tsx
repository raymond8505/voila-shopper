import { css } from "@emotion/react"
import { Product } from "@src/types/product"
import type { PriceTracker as IPriceTracker } from "@src/types/product/price-tracker"
import { Form, Input, InputNumber, Select } from "antd"
import { LoaderButton } from "./common/LoaderButton/LoaderButton"
import { useForm } from "antd/es/form/Form"
import { useCallback } from "react"

export function PriceTracker({
	rule,
	editing = false,
	onSubmit,
	loading = false,
}: {
	rule?: IPriceTracker.Rule
	editing?: boolean
	onSubmit?: (
		rule: IPriceTracker.Rule,
		resetFields: (fields?: any[] | undefined) => void
	) => void
	loading?: boolean
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
			<div
				css={css`
					display: grid;
					grid-template-columns: repeat(1fr, 4);
					grid-template-rows: auto auto;
					gap: 8px;
				`}
			>
				<div
					css={css`
						grid-column: 1 / 5;
					`}
				>
					{editing ? (
						<Form.Item
							required
							name="query"
							help={
								"Describe the product or commodity to track, we'll try to find the closest matches and then apply the price rules."
							}
						>
							<Input placeholder="Search Query" />
						</Form.Item>
					) : (
						rule?.query
					)}
				</div>
				<div>
					{editing ? (
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
								placeholder="Price Type"
							></Select>
						</Form.Item>
					) : (
						rule?.priceType
					)}
				</div>
				<div>
					{editing ? (
						<Form.Item name="priceComparison" required>
							<Select
								options={[
									{
										label: "Less Than, or Equal To",
										value: "<=",
									},
									{
										label: "Less Than",
										value: "<",
									},
									{
										label: "Greater Than, or Equal To",
										value: ">=",
									},
									{
										label: "Greater Than",
										value: ">",
									},
								]}
								placeholder="Comparison"
							></Select>
						</Form.Item>
					) : (
						rule?.priceComparison
					)}
				</div>
				{editing ? (
					<Form.Item required name="price">
						<InputNumber
							placeholder="Price"
							formatter={(value) => `$${value}`}
						/>
					</Form.Item>
				) : (
					rule?.price
				)}
				<div>
					<LoaderButton
						type="primary"
						htmlType="button"
						onClick={handleSubmit}
						label={buttonLabel}
						loading={loading}
					/>
				</div>
			</div>
		</Form>
	)
}
