import { css } from "@emotion/react"
import type { PriceTracker as IPriceTracker } from "@src/types/product/price-tracker"
import {
	ConfigProvider,
	Flex,
	Form,
	Input,
	InputNumber,
	Select,
} from "antd"
import Space from "antd/es/space"
import { LoaderButton } from "../common/LoaderButton/LoaderButton"
import { useForm } from "antd/es/form/Form"
import { useCallback, useState } from "react"

import { UnstyledButton } from "../common/UnstyledButton"
import EditOutlined from "@ant-design/icons/EditOutlined"
import DeleteOutlined from "@ant-design/icons/DeleteOutlined"
import CloseOutlined from "@ant-design/icons/CloseOutlined"
import { Help } from "../common/Help"
import { usePriceTracker } from "@src/hooks/usePriceTracker"
import { formatCurrency } from "../../helpers"

export function PriceTrackerRule({
	rule,
	editing: editingParam = false,
	onSubmit: onSubmitParam,
	loading: loadingParam = false,
	showHelp = false,
	mode = "edit",
}: {
	rule?: IPriceTracker.Rule
	editing?: boolean
	onSubmit?: (
		rule: IPriceTracker.Rule,
		resetFields: (fields?: any[] | undefined) => void,
		mode: "create" | "edit",
	) => Promise<void>
	loading?: boolean
	showHelp?: boolean
	mode?: "create" | "edit"
}) {
	const [editing, setEditing] = useState(editingParam)
	const [loading, setLoading] = useState(loadingParam)

	const { deleteRule } = usePriceTracker()

	const buttonLabel = editing
		? rule === undefined
			? "Create"
			: "Edit"
		: ""

	const [form] = useForm()

	const onSubmit = useCallback(async () => {
		if (!loading) {
			console.log("submitting")
			setLoading(true)

			const fields = form.getFieldsValue()
			console.log({ fields })

			await onSubmitParam?.(
				{
					...fields,
					id: rule?.id,
				} as IPriceTracker.Rule,
				form.resetFields,
				mode,
			)
			setLoading(false)
			setEditing(editingParam)
		}
	}, [form, onSubmitParam, setLoading, editingParam, mode])

	const onEditClick = useCallback(
		(e) => {
			e.preventDefault()
			e.stopPropagation()
			setEditing(!editingParam)

			if (editing) {
				onSubmit()
			} else {
				form.setFieldsValue({
					...rule,
				})
			}
		},
		[editing, editingParam, onSubmit, form, rule],
	)

	const onDeleteClick = useCallback(
		(e) => {
			e.preventDefault()
			e.stopPropagation()

			if (rule) {
				deleteRule(rule)
			}
		},
		[rule, deleteRule, setEditing],
	)

	return (
		<ConfigProvider
			theme={{
				components: {
					Form: {
						itemMarginBottom: 0,
					},
				},
			}}
		>
			<Form form={form} onFinish={onSubmit}>
				<div>
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
											padding: 8px 0 16px;
										`}
									>
										Ex: "Greek yogurt", "3-ply toilet paper",
										"Kraft Dinner"
									</div>
								}
							>
								<Input placeholder="Search Query" required />
							</Form.Item>
						</>
					) : (
						<div
							css={css`
								font-weight: bold;
								line-height: 1;
							`}
						>
							({rule?.matches?.length ?? 0}) {rule?.query}
						</div>
					)}
				</div>

				<Flex justify="space-between">
					{editing ? (
						<Space.Compact>
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
						<div>
							{formatCurrency(rule?.price)} / {rule?.priceType}
						</div>
					)}
					<div
						css={css`
							display: flex;
							align-items: center;
							gap: 8px;
						`}
					>
						<>
							{mode === "edit" ? (
								editing ? (
									<UnstyledButton
										onClick={(e) => {
											setEditing(false)
											e.preventDefault()
											e.stopPropagation()
										}}
										aria-label="cancel edititing"
									>
										<CloseOutlined />
									</UnstyledButton>
								) : (
									<UnstyledButton
										confirmProps={{
											title:
												"Are you sure you want to delete this rule?",
											onConfirm: onDeleteClick,
										}}
										aria-label="delete price tracker rule"
									>
										<DeleteOutlined />
									</UnstyledButton>
								)
							) : null}

							<LoaderButton
								type={editing ? "primary" : "unstyled"}
								htmlType="submit"
								onClick={editing ? undefined : onEditClick}
								label={buttonLabel}
								loading={loading}
								icon={editing ? undefined : <EditOutlined />}
							/>
						</>
						{showHelp ? (
							<Help
								text={`Search for something and add a price, we'll let you know when anything matches.`}
							/>
						) : null}
					</div>
				</Flex>
			</Form>
		</ConfigProvider>
	)
}
