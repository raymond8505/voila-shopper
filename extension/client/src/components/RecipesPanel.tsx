import { useCallback, useMemo, useRef, useState } from "react"

import { Button, Collapse, Input } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { useShopper } from "../hooks/useShopper"
import type { Voila } from "../types"
import { css } from "@emotion/react"
import { mapProductsToCategories } from "../helpers"
import { ProductCardGrid } from "./ProductCardGrid"

export function RecipesPanel() {
	const { getRecommendations } = useShopper()
	const gettingRecommendations = useRef(false)
	const [recommendedProducts, setRecommendedProducts] = useState<
		Voila.Product[]
	>([])
	const [jobId, setJobId] = useState("")

	const handleGetJobClick = useCallback(() => {
		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			getRecommendations("7900dba4-fc24-4f56-b8b9-378fde6915e1").then(
				(products) => {
					console.log("Recommended products:", products)
					gettingRecommendations.current = false
					setRecommendedProducts(products)
				}
			)
		}
	}, [getRecommendations, setRecommendedProducts])

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
				recipes
			</div>
		</div>
	)
}
