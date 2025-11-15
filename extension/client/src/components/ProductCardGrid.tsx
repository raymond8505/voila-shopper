import { css } from "@emotion/react"
import { Voila } from "../types"
import { ProductCard } from "./ProductCard"

export function ProductCardGrid({ products }: { products: Voila.Product[] }) {
	return (
		<div
			css={css`
				display: grid;
				grid-template-columns: repeat(2, calc(50% - 4px));
				gap: 8px;

				.ant-card-meta-title {
					white-space: wrap;
					text-overflow: none;
				}
			`}
		>
			{products.map((product) => (
				<ProductCard product={product} key={product.productId} />
			))}
		</div>
	)
}
