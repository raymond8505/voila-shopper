import { useSourceProducts } from "@src/hooks/useSourceProducts"

import { createPortal } from "react-dom"
import { PriceIntelligence } from "./integration/PriceIntelligence"
import { useCallback, useEffect, useState } from "react"
import { UnstyledButton } from "./common/UnstyledButton"
import PlusSquareOutlined from "@ant-design/icons/PlusSquareOutlined"
import { useStore } from "@src/store/client"

/**
 * every place on the source page that needs to house a PriceIntelligence component
 */
const priceTargetParentSelectors = (externalId: string) => [
	`[data-test="fop-wrapper:${externalId}"] [data-test="fop-price-wrapper"]`,
]
export function SourceIntegration() {
	const { products, getProductByFullId } = useSourceProducts()

	const { setRecipeCriteria } = useStore()

	const [portalTargets, setPortalTargets] = useState<
		Map<string, HTMLElement[]>
	>(new Map())

	useEffect(() => {
		// ... DOM injection logic, but store the target elements not the portals
		products.forEach((storeProduct) => {
			const wrappers: HTMLElement[] = []
			const fullProductId = storeProduct.full?.product.id

			if (storeProduct.full && fullProductId) {
				priceTargetParentSelectors(
					storeProduct.full.latest_prices[0].source_id,
				).forEach((parentSelector) => {
					const parentElements = Array.from(
						document.querySelectorAll(parentSelector),
					)

					parentElements.forEach((parent) => {
						const existingWrapper = parent.querySelector(
							".vs-price-intelligence",
						) as HTMLElement

						if (!existingWrapper) {
							const newWrapper = document.createElement("div")
							newWrapper.classList.add("vs-price-intelligence")

							parent.parentElement?.after(newWrapper)

							wrappers.push(newWrapper)
						} else {
							wrappers.push(existingWrapper)
						}
					})
				})

				setPortalTargets((prev) => {
					const newMap = new Map(prev)
					newMap.set(fullProductId, wrappers)
					return newMap
				})
			}
		})
	}, [products, setPortalTargets])

	const onAddIngredientClick = useCallback(
		(fullId: string) => {
			const product = getProductByFullId(fullId)
			console.log({ product })
		},
		[setRecipeCriteria, getProductByFullId],
	)

	return (
		<>
			{products.flatMap((storeProduct) => {
				const fullProductId = storeProduct.full?.product.id

				if (!fullProductId) return []

				const targets = portalTargets.get(fullProductId)

				if (!targets?.length) return null

				return targets.map((target) =>
					createPortal(
						<div
							style={{
								display: "flex",
								gap: "8px",
							}}
						>
							<PriceIntelligence productId={fullProductId} />
							<UnstyledButton
								onClick={() =>
									onAddIngredientClick(fullProductId)
								}
							>
								<PlusSquareOutlined />
							</UnstyledButton>
						</div>,
						target,
					),
				)
			})}
		</>
	)
}
