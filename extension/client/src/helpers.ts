import type { Voila } from "./types"

export function mapProductsToCategories(products: Voila.Product[]) {
	return products.reduce<Record<string, Voila.Product[]>>((acc, product) => {
		const category = product.categoryPath[0] || "Uncategorized"

		if (!acc[category]) {
			acc[category] = []
		}

		acc[category].push(product)

		return acc
	}, {})
}
