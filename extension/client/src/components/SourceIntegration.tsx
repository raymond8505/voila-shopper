import { useProducts } from "@src/hooks/useProducts"

import { createPortal } from "react-dom"
import { PriceIntelligence } from "./integration/PriceIntelligence"
import { useEffect, useState } from "react"

/**
 * every place on the source page that needs to house a PriceIntelligence component
 */
const priceTargetParentSelectors = (externalId: string) => [
	`[data-test="fop-wrapper:${externalId}"] [data-test="fop-price-wrapper"]`,
]
export function SourceIntegration() {
	const { products } = useProducts()

	const [portalTargets, setPortalTargets] = useState<
		Map<string, HTMLElement[]>
	>(new Map())

	useEffect(() => {
		// ... DOM injection logic, but store the target elements not the portals
		products.forEach((storeProduct) => {
			const wrappers: HTMLElement[] = []
			const fullProductId = storeProduct.full?.id

			if (storeProduct.full && fullProductId) {
				priceTargetParentSelectors(
					storeProduct.full.price_intelligence.current
						.external_id
				).forEach((parentSelector) => {
					const parentElements = Array.from(
						document.querySelectorAll(parentSelector)
					)

					parentElements.forEach((parent) => {
						const existingWrapper = parent.querySelector(
							".vs-price-intelligence"
						) as HTMLElement

						if (!existingWrapper) {
							const newWrapper = document.createElement("span")
							newWrapper.classList.add("vs-price-intelligence")

							parent.append(newWrapper)

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

	return (
		<>
			{products.flatMap((storeProduct) => {
				const fullProductId = storeProduct.full?.id

				if (!fullProductId) return []

				const targets = portalTargets.get(fullProductId)

				if (!targets?.length) return null

				return targets.map((target) =>
					createPortal(
						<PriceIntelligence productId={fullProductId} />,
						target
					)
				)
			})}
		</>
	)
}
