import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Collapse from "antd/es/collapse"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"

import { useShopper } from "../hooks/useShopper"
import type { CategoryTree, Job, Voila } from "../types/index"
import { css } from "@emotion/react"
import { categoryTreeFromProducts } from "../helpers"
import { ProductCardGrid } from "./ProductCardGrid"
import { useJobManager } from "../hooks/useJobManager"
import Divider from "antd/es/divider"
import Select from "antd/es/select"
import { LoaderButton } from "./common/LoaderButton"
import { isWorkflowError } from "../types/helpers"
import Alert from "antd/es/alert"
import { OldTripsWrapper, Wrapper } from "./ProductsPanel.styles"

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
	const [jobs, setJobs] = useState<Job.TrimmedJob[]>([])
	const [oldJobLoading, setOldJobLoading] = useState(false)
	const [errorText, setErrorText] = useState<null | string>(null)

	useEffect(() => {
		getJobIds().then((allJobs) => {
			const doneJobs = allJobs.filter((job) => job.status === "done")
			setJobs(doneJobs)
			setJobId(doneJobs[0].id)
		})
	}, [setJobs, getJobIds, setJobId])

	const handleGetOldJobClick = useCallback(() => {
		setErrorText(null)

		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			setOldJobLoading(true)

			getRecommendations(jobId)
				.then((products) => {
					gettingRecommendations.current = false
					setOldJobLoading(false)
					setRecommendedProducts(products)
				})
				.catch(() => {
					gettingRecommendations.current = false
					setOldJobLoading(false)
				})
		}
	}, [
		setErrorText,
		getRecommendations,
		setRecommendedProducts,
		jobId,
		setOldJobLoading,
	])

	const handleGetNewJobClick = useCallback(async () => {
		setErrorText(null)
		if (!gettingRecommendations.current) {
			gettingRecommendations.current = true
			generateRecommendations()
				.then((products) => {
					gettingRecommendations.current = false

					if (isWorkflowError(products)) {
						setErrorText(products.message)
					} else {
						setRecommendedProducts(products)
					}
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
		<Wrapper>
			<div>
				<strong>Old Trips</strong>
				<OldTripsWrapper>
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
							defaultValue={jobs[0]?.created_at.toLocaleString()}
							getPopupContainer={() => selectWrapper.current || document.body}
							options={jobs.map((j) => ({
								value: j.id,
								label: j.created_at.toLocaleString(),
							}))}
						/>
					</div>
					<div>
						<LoaderButton
							onClick={handleGetOldJobClick}
							label="Get Previous Trip"
							loading={oldJobLoading}
							icon={<ShoppingCartOutlined />}
						/>
						{errorText ? <Alert message={errorText} type="error" /> : null}
					</div>
				</OldTripsWrapper>
				<Divider />
			</div>
			<div>
				<strong>New Trip</strong>
				<div>
					<LoaderButton
						label="Find Promotions"
						loadingLabel="Finding Promotions..."
						loading={recommendationsLoading}
						icon={<ShoppingCartOutlined />}
						onClick={handleGetNewJobClick}
						type="primary"
					/>
				</div>
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
		</Wrapper>
	)
}
