import { useStoreProduct } from "@src/hooks/useStoreProduct"

export function PriceIntelligence({
	productId,
}: {
	productId?: string
}) {
	const product = useStoreProduct(productId)

	if (!product) return null

	return (
		<div>
			{product?.full?.price_intelligence?.current?.price}
		</div>
	)
}
