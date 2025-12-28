import { Product } from "@src/types/product"
import { useStore as useProductsStore } from "@store/products"
import { useCallback, useEffect } from "react"
export function useProducts() {
	const { addProducts, products } = useProductsStore()

	const hydrateProducts = useCallback(
		(newProducts: Product.Product[]) => {
			const newProductsToAdd = newProducts.filter(
				(newProduct) =>
					!products.some(
						(existingProduct) =>
							existingProduct.name === newProduct.name
					)
			)
		},
		[addProducts, products]
	)

	return { hydrateProducts }
}
