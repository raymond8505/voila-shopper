import { useStoreProduct } from "@src/hooks/useStoreProduct"
import GoldOutlined from "@ant-design/icons/GoldOutlined"
import BarcodeOutlined from "@ant-design/icons/BarcodeOutlined"
import { PriceDifferenceArrow } from "./PriceDifferenceArrow"

export function PriceIntelligence({
	productId,
}: {
	productId?: string
}) {
	const product = useStoreProduct(productId)

	if (!product?.full?.price_stats) return null

	const avgRegProductPrice =
		product.full.price_stats
			.avg_regular_price
	const avgSaleProductPrice =
		product.full.price_stats
			.avg_sale_price
	const isSale = product.full.latest_prices[0].is_sale

	const shouldShowProductArrow = isSale
		? !!avgSaleProductPrice
		: !!avgRegProductPrice

	const avgRegCommodityPrice =
		product.full.commodity_stats
			.avg_regular_price
	const avgSaleCommodityPrice =
		product.full.price_intelligence.commodity_stats
			.avg_sale_price

	const shouldShowCommodityArrow = isSale
		? !!avgSaleCommodityPrice
		: !!avgRegCommodityPrice

	return (
		<div
			style={{
				display: "flex",
				gap: "4px",
				alignItems: "center",
				width: "100%",
			}}
		>
			{shouldShowProductArrow ? (
				<div>
					<BarcodeOutlined />
					<PriceDifferenceArrow
						currentPrice={product.full.latest_prices[0].price}
						comparePrice={
							isSale ? avgSaleProductPrice! : avgRegProductPrice!
						}
					/>
				</div>
			) : null}
			{shouldShowCommodityArrow ? (
				<div>
					<GoldOutlined />
					<PriceDifferenceArrow
						currentPrice={product.full.latest_prices[0].price}
						comparePrice={
							isSale
								? avgSaleCommodityPrice!
								: avgRegCommodityPrice!
						}
					/>
				</div>
			) : null}
		</div>
	)
}
