import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Button from "antd/es/button"
import Collapse from "antd/es/collapse"

import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"
import { useShopper } from "../hooks/useShopper"
import type { CategoryTree, Job, Voila } from "../types"
import { css } from "@emotion/react"
import { categoryTreeFromProducts } from "../helpers"
import { ProductCardGrid } from "./ProductCardGrid"
import { useJobManager } from "../hooks/useJobManager"
import Divider from "antd/es/divider"

export function ProductsPanel() {
	const { getRecommendations } = useShopper()
	const { getJobIds } = useJobManager()
	const gettingRecommendations = useRef(false)
	const [recommendedProducts, setRecommendedProducts] = useState<
		Voila.Product[]
	>([])
	const [jobId, setJobId] = useState("")
	const [jobs, setJobs] = useState<Pick<Job.JobItem, "id" | "created_at">[]>([])

	useEffect(() => {
		getJobIds().then((allJobs) => {
			console.log(allJobs)
			setJobs(allJobs)
		})
	}, [setJobs])

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
				grid-template-rows: auto auto 1fr;
			`}
		>
			<div>
				<strong>Old Trips</strong>
				<div
					css={css`
						display: flex;
						gap: 8px;
						width: 100%;
						align-items: stretch;
					`}
				>
					<select
						placeholder="Job ID"
						onChange={(e) => {
							setJobId(e.target.value)
						}}
						css={css`
							flex-grow: 1;
							display: block;
						`}
					>
						<option disabled>Job ID</option>
						{jobs.map(({ id, created_at }) => {
							console.log({ id, created_at })
							return (
								<option value={id}>
									{created_at.toDateString()} {created_at.toLocaleTimeString()}
								</option>
							)
						})}
					</select>
					<Button
						type="primary"
						icon={<ShoppingCartOutlined />}
						onClick={handleGetJobClick}
						css={css`
							flex-shrink: 0;
							display: block;
							height: unset !important;
							aspect-ratio: 1;
						`}
					/>
				</div>
				<Divider />
			</div>
			<div>
				<strong>New Trip</strong>
				<Divider />
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
