import { useCallback, useMemo, useRef, useState } from "react"
import Button from "antd/es/button"
import Collapse from "antd/es/collapse"
import Input from "antd/es/input"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"
import { useShopper } from "../hooks/useShopper"
import type { CategoryTree, Voila } from "../types"
import { css } from "@emotion/react"
import { categoryTreeFromProducts } from "../helpers"
import { ProductCardGrid } from "./ProductCardGrid"

export function ProductsPanel() {
	const { getRecommendations } = useShopper()
	const gettingRecommendations = useRef(false)
	const [recommendedProducts, setRecommendedProducts] = useState<
		Voila.Product[]
	>([])
	const [jobId, setJobId] = useState("")

	const handleGetJobClick = useCallback(() => {
		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			getRecommendations(jobId)
				.then((products) => {
					console.log("Recommended products:", products)
					gettingRecommendations.current = false
					setRecommendedProducts(products)
				})
				.catch((e) => {
					console.log("Recommended products:", e)
					gettingRecommendations.current = false
				})
		}
	}, [getRecommendations, setRecommendedProducts, jobId])

	const categorizedProducts = useMemo(
		() => categoryTreeFromProducts(recommendedProducts, 1),
		[recommendedProducts]
	)

	function createCategoryCollapse(
		input: CategoryTree | Voila.Product[],
		name?: string
	) {
		if (Array.isArray(input)) {
			console.log({ input }, name)
			return (
				<Collapse>
					<Collapse.Panel
						header={`${name} (${input.length})`}
						key={name || Math.random()}
					>
						<ProductCardGrid products={input} key={name} />
					</Collapse.Panel>
				</Collapse>
			)
		} else {
			return (
				<Collapse>
					<Collapse.Panel header={`${name}`} key={name || Math.random()}>
						{Object.entries(input)
							.sort(([categoryA], [categoryB]) =>
								categoryA.localeCompare(categoryB)
							)
							.map(([categoryName, pOrC]) => {
								return createCategoryCollapse(pOrC, categoryName)
							})}
					</Collapse.Panel>
				</Collapse>
			)
		}
	}
	return (
		<div
			css={css`
				display: grid;
				gap: 8px;
				height: 100%;
				grid-template-rows: auto 1fr;
			`}
		>
			<div
				css={css`
					display: flex;
					gap: 8px;
				`}
			>
				<Input
					type="text"
					placeholder="Job ID"
					value={jobId}
					onChange={(e) => setJobId(e.target.value)}
				/>
				<Button
					type="primary"
					icon={<ShoppingCartOutlined />}
					onClick={handleGetJobClick}
				/>
			</div>
			<div
				css={css`
					overflow: auto;
					padding: 8px;
				`}
			>
				{Object.entries(categorizedProducts).map(([category, val]) =>
					createCategoryCollapse(val, category)
				)}
			</div>
		</div>
	)
}
