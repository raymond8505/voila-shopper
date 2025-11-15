import { Card } from "antd"
import type { Voila } from "../types"

export function ProductCard({ product }: { product: Voila.Product }) {
	return (
		<Card
			cover={
				product.images && product.images.length > 0 ? (
					<img alt={product.name} src={product.images[0].src} />
				) : null
			}
			key={product.productId}
		>
			<Card.Meta
				title={product.name}
				description={
					<>
						<dl
							style={{
								fontSize: "max(.8em,10px)",
							}}
						>
							<dt>
								<strong style={{ color: "#9d2500" }}>Sale Price</strong>
							</dt>
							<dd>
								<strong style={{ color: "#9d2500" }}>
									{product.promoPrice?.amount}
								</strong>
							</dd>
							<dt>Regular Price</dt>
							<dd>{product.price.amount}</dd>
						</dl>
					</>
				}
			/>
		</Card>
	)
}
