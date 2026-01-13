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
import { LoaderButton } from "./common/LoaderButton/LoaderButton"
import { useForm } from "antd/es/form/Form"
import { useCallback, useState } from "react"

import { UnstyledButton } from "./common/elements.styles"
import EditOutlined from "@ant-design/icons/EditOutlined"
import DeleteOutlined from "@ant-design/icons/DeleteOutlined"
import { Help } from "./common/Help"
import { usePriceTracker } from "@src/hooks/usePriceTracker"

export function PriceTrackerRule({
	rule,
	editing: editingParam = false,
	onSubmit: onSubmitParam,
	loading: loadingParam = false,
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
	const [editing, setEditing] = useState(editingParam)
	const [loading, setLoading] = useState(loadingParam)

	const { deleteRule } = usePriceTracker()

	const buttonLabel = editing
		? rule === undefined
			? "Create"
			: "Edit"
		: ""

	const [form] = useForm()

	const onSubmit = useCallback(() => {
		setLoading(true)
		form.validateFields().then((fields) => {
			console.log({ fields })
			setEditing(editingParam)
			setLoading(false)
			onSubmitParam?.(
				fields as IPriceTracker.Rule,
				form.resetFields
			)
		})
	}, [form, onSubmitParam, setLoading])

	const onEditClick = useCallback(() => {
		setEditing(!editingParam)
		console.log({ editing, editingParam })

		if (editing) {
			onSubmit()
		} else {
			form.setFieldsValue({
				...rule,
			})
		}
	}, [editing, editingParam, onSubmit, form, rule])

	const onCloseClick = useCallback(() => {
		setEditing(false)

		if (rule) {
			deleteRule(rule)
		}
	}, [rule, deleteRule, setEditing])

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
			<Form form={form}>
				<div>
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
									<Input placeholder="Search Query" />
								</Form.Item>
							</>
						) : (
							<div
								css={css`
									font-weight: bold;
									font-size: 1.2em;
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
								<div>
									${rule?.price} / {rule?.priceType}
								</div>
							</div>
						)}
						<div>
							{showHelp ? (
								<Help
									text={`Search for something and add a price, we'll let you know when anything matches.`}
								/>
							) : (
								<UnstyledButton onClick={onCloseClick}>
									<DeleteOutlined />
								</UnstyledButton>
							)}
							<>
								<LoaderButton
									type={editing ? "primary" : "unstyled"}
									htmlType="button"
									onClick={editing ? onSubmit : onEditClick}
									label={buttonLabel}
									loading={loading}
									icon={editing ? undefined : <EditOutlined />}
									style={{ marginLeft: 8 }}
								/>
							</>
						</div>
					</Flex>
				</div>
			</Form>
		</ConfigProvider>
	)
}
