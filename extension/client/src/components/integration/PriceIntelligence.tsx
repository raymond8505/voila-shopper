import { useStoreProduct } from "@src/hooks/useStoreProduct"
import GoldOutlined from "@ant-design/icons/GoldOutlined"
import BarcodeOutlined from "@ant-design/icons/BarcodeOutlined"

function getPriceDifference(
	currentPrice: number,
	comparePrice: number
) {
	return (currentPrice - comparePrice) / comparePrice
}
export function PriceIntelligence({
	productId,
}: {
	productId?: string
}) {
	const product = useStoreProduct(productId)

	if (!product?.full?.price_intelligence) return null

	const avgRegProductPrice =
		product.full.price_intelligence.product_history
			.avg_regular_price
	const avgSaleProductPrice =
		product.full.price_intelligence.product_history
			.avg_sale_price
	const isSale = product.full.price_intelligence.current.is_sale

	const productDiff = getPriceDifference(
		product.full.price_intelligence.current.price,
		/**
		 * we return early above if price_intelligence doesn't exist.
		 * If price_intelligence exists, so do these values.
		 */
		isSale ? avgSaleProductPrice! : avgRegProductPrice!
	)
	return (
		<div>
			<div>
				<BarcodeOutlined />
				{productDiff.toFixed(2)}
				<PriceDifferenceIcon
					currentPrice={
						product.full.price_intelligence.current.price
					}
					comparePrice={
						isSale ? avgSaleProductPrice! : avgRegProductPrice!
					}
					tooltip={`dynamic message about price specifics`}
				/>
			</div>
			<div>
				<GoldOutlined />
				{
					product?.full?.price_intelligence?.commodity_stats
						.avg_regular_price
				}
			</div>
		</div>
	)
}
