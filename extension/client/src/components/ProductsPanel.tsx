import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Collapse from "antd/es/collapse"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"

import { useShopper } from "../hooks/useShopper"
import type { CategoryTree, Job, Voila } from "../types"
import { css } from "@emotion/react"
import { categoryTreeFromProducts } from "../helpers"
import { ProductCardGrid } from "./ProductCardGrid"
import { useJobManager } from "../hooks/useJobManager"
import Divider from "antd/es/divider"
import Select from "antd/es/select"
import { LoaderButton } from "./common/LoaderButton"

export function ProductsPanel() {
	const {
		getRecommendations,
		generateRecommendations,
		recommendationsLoading,
	} = useShopper()
	const { getJobIds } = useJobManager()
	const gettingRecommendations = useRef(false)
	const [recommendedProducts, setRecommendedProducts] = useState<
		Voila.Product[]
	>([])
	const [jobId, setJobId] = useState("")
	const [jobs, setJobs] = useState<
		Pick<Job.JobItem<Record<string, unknown>>, "id" | "created_at" | "status">[]
	>([])
	const [oldJobLoading, setOldJobLoading] = useState(false)

	useEffect(() => {
		getJobIds().then((allJobs) => {
			console.log({ allJobs })
			const doneJobs = allJobs.filter((job) => job.status === "done")
			setJobs(doneJobs)
			setJobId(doneJobs[0].id)
		})
	}, [setJobs])

	const handleGetOldJobClick = useCallback(() => {
		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			setOldJobLoading(true)

			getRecommendations(jobId)
				.then((products) => {
					console.log("Recommended products:", products)
					gettingRecommendations.current = false
					setOldJobLoading(false)
					setRecommendedProducts(products)
				})
				.catch((e) => {
					console.error("Recommended products ERROR:", e)
					gettingRecommendations.current = false
					setOldJobLoading(false)
				})
		}
	}, [getRecommendations, setRecommendedProducts, jobId, setOldJobLoading])

	const handleGetNewJobClick = useCallback(async () => {
		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			generateRecommendations()
				.then((products) => {
					console.log("Recommended products:", products)
					gettingRecommendations.current = false
					setRecommendedProducts(products)
				})
				.catch((e) => {
					console.error("Recommended products ERROR:", e)
					gettingRecommendations.current = false
				})
		}
	}, [generateRecommendations])
	const categorizedProducts = useMemo(
		() => categoryTreeFromProducts(recommendedProducts, 1),
		[recommendedProducts]
	)

	const createCategoryCollapse = useCallback(
		(input: CategoryTree | Voila.Product[], name: string, key?: string) => {
			if (Array.isArray(input)) {
				return (
					<Collapse>
						<Collapse.Panel
							header={`${name} (${input.length})`}
							key={key ?? name}
						>
							<ProductCardGrid products={input} />
						</Collapse.Panel>
					</Collapse>
				)
			} else {
				return (
					<Collapse>
						<Collapse.Panel header={`${name}`} key={key ?? name}>
							{Object.entries(input)
								.sort(([categoryA], [categoryB]) =>
									categoryA.localeCompare(categoryB)
								)
								.map(([categoryName, pOrC], i) => {
									return (
										<span key={i}>
											{createCategoryCollapse(
												pOrC,
												name,
												`${name}-${categoryName}`
											)}
										</span>
									)
								})}
						</Collapse.Panel>
					</Collapse>
				)
			}
		},
		[]
	)

	const selectWrapper = useRef<HTMLDivElement>(null)
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
						height: 32px;
						align-items: stretch;
					`}
				>
					<div
						ref={selectWrapper}
						css={css`
							flex-grow: 1;
						`}
					>
						<Select
							placeholder="Job ID"
							onChange={(e) => {
								setJobId(e)
							}}
							css={css`
								flex-grow: 1;
								display: block;
							`}
							defaultValue={jobs[0]?.id}
							getPopupContainer={() => selectWrapper.current || document.body}
							options={jobs.map((j) => ({
								value: j.id,
								label: j.created_at.toLocaleString(),
							}))}
						/>
					</div>
					<LoaderButton
						onClick={handleGetOldJobClick}
						css={css`
							flex-shrink: 0;
							display: flex;
							gap: 4px;
							height: unset !important;
							aspect-ratio: 1;
						`}
						label="Get Previous Trip"
						loading={oldJobLoading}
						icon={<ShoppingCartOutlined />}
					/>
				</div>
				<Divider />
			</div>
			<div>
				<strong>New Trip</strong>
				<LoaderButton
					label="Find Promotions"
					loadingLabel="Finding Promotions..."
					loading={recommendationsLoading}
					icon={<ShoppingCartOutlined />}
					onClick={handleGetNewJobClick}
					type="primary"
					css={css`
						display: flex;
						gap: 4px;
					`}
				/>
				<Divider />
			</div>
			<div
				css={css`
					overflow: auto;
					padding: 8px;
				`}
			>
				{recommendationsLoading ? (
					<LoadingOutlined />
				) : (
					Object.entries(categorizedProducts).map(([category, val], i) => (
						<span key={i}>{createCategoryCollapse(val, category)}</span>
					))
				)}
			</div>
		</div>
	)
}
