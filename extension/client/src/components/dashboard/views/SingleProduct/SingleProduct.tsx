import { Help } from "@src/components/common/Help"
import { LoaderButton } from "@src/components/common/LoaderButton/LoaderButton"
import { useFullProducts } from "@src/hooks/useFullProducts"
import { ProductView } from "@src/types/product/product-view"

import {
	Col,
	ConfigProvider,
	Form,
	Input,
	Row,
	Select,
} from "antd"
import { useForm } from "antd/es/form/Form"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function SingleProduct() {
	const { productId } = useParams()
	const { getProductById } = useFullProducts()

	const [product, setProduct] =
		useState<ProductView.ProductView>()

	useEffect(() => {
		getProductById(productId).then((p) =>
			setProduct(p as ProductView.ProductView),
		)
	}, [productId, setProduct])

	const [form] = useForm()

	const onProductFormSubmit = useCallback(() => {}, [])

	if (!product) return null

	console.log({ product })

	return (
		<ConfigProvider
			theme={{
				components: {
					Form: {
						verticalLabelPadding: "0",
						itemMarginBottom: 8,
					},
				},
			}}
		>
			<Form
				form={form}
				onFinish={onProductFormSubmit}
				initialValues={{
					brand: product.product.brand,
					variants: product.product.variants,
					product_type: product.product.product_type,
				}}
				layout="vertical"
				size="small"
			>
				<Row>
					<Col span={24}>
						<h1>{product?.product.raw_name}</h1>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<h2>Product Info</h2>
						<Form.Item name={"brand"} label={"Brand"}>
							<Input type={"text"} />
						</Form.Item>
						<Form.Item name="variants" label={"Variants"}>
							<Select mode="tags"></Select>
						</Form.Item>
						<Form.Item
							name={"product_type"}
							label={"Product Type"}
						>
							<Input type={"text"} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<h2>Package Info</h2>
					</Col>
					<Col span={8}>
						<h2>
							<Help
								buttonProps={{ style: { marginRight: 8 } }}
								text="If this product or products like it have special considerations when ingesting, add those here to teach the AI"
							/>
							Special Instructions
						</h2>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<LoaderButton
							htmlType="submit"
							type={"primary"}
							label="Edit"
						/>
					</Col>
				</Row>
			</Form>
		</ConfigProvider>
	)
}
