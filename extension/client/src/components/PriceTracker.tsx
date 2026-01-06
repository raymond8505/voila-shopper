import { css } from "@emotion/react"
import { Product } from "@src/types/product"
import { Form, Input, InputNumber, Select } from "antd"
import { LoaderButton } from "./common/LoaderButton/LoaderButton"
import { useForm } from "antd/es/form/Form"
import { useCallback } from "react"

export function PriceTracker({
	rule,
	editing = false,
	onSubmit,
}: {
	rule?: Product.PriceTrackerRule
	editing?: boolean
	onSubmit?: (
		rule: Product.PriceTrackerRule,
		resetFields: (fields?: any[] | undefined) => void
	) => void
}) {
	const buttonLabel = editing
		? rule === undefined
			? "Create"
			: "Edit"
		: "Edit"

	const [form] = useForm()

	const handleSubmit = useCallback(
		(e) => {
			onSubmit?.(
				form.getFieldsValue() as Product.PriceTrackerRule,
				form.resetFields
			)
		},
		[form, onSubmit]
	)

	return (
		<Form form={form}>
			<div
				css={css`
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr;
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
							name="price"
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
						<Form.Item name="priceType">
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
						<Form.Item name="isSale">
							<Select
								options={[
									{
										label: "Regular Price",
										value: false,
									},
									{
										label: "Sale Price",
										value: true,
									},
								]}
								placeholder="Regular or Sale Price"
							></Select>
						</Form.Item>
					) : (
						rule?.priceType
					)}
				</div>
				<div>
					{editing ? (
						<Form.Item name="priceComparison">
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
				<Form.Item required name="query">
					<InputNumber
						placeholder="Price"
						formatter={(value) => `$${value}`}
					/>
				</Form.Item>
				<div>
					<LoaderButton
						type="primary"
						htmlType="button"
						onClick={handleSubmit}
						label={buttonLabel}
					/>
				</div>
			</div>
		</Form>
	)
}
