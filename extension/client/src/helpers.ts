import type { CategoryTree, MinimalPrice, Voila } from "./types"

export function concatenationToArray(txt: string): string[] {
	if (txt.search(/^c\(/) === -1) {
		return [txt]
	}

	console.log({ txt })

	return JSON.parse(txt.replace(/^c\(/, "[").replace(/\)$/, "]"))
}
export function getMinimalPrice(product: Voila.DecoratedProduct): MinimalPrice {
	return {
		currentPrice: product.promoPrice
			? product.promoPrice.amount
			: product.price.amount,
		originalPrice: product.price.amount,
	}
}
export function categoryTreeFromProducts(
	products: Voila.Product[],
	depthIndex = 0
): CategoryTree {
	const categoryTree: CategoryTree = {} // This will be the root of our tree

	for (const product of products) {
		const depth = Math.min(product.categoryPath.length, depthIndex)
		let currentLevel: CategoryTree = categoryTree // Start from the root for each product

		for (let i = 0; i <= depth; i++) {
			const categoryName = product.categoryPath[i]
			const isLastCategory = i === depth

			if (isLastCategory) {
				if (!currentLevel[categoryName]) {
					// If it doesn't exist, initialize as an array with the current product.
					currentLevel[categoryName] = [product]
				} else if (Array.isArray(currentLevel[categoryName])) {
					// If it's already an array, push the current product to it.
					;(currentLevel[categoryName] as Voila.Product[]).push(product)
				}
			} else {
				// If it's not the last category, it must be an intermediate node (an object).
				// Ensure it's an object to allow further nesting.
				if (!currentLevel[categoryName]) {
					// If it doesn't exist, create an empty object for the next level.
					currentLevel[categoryName] = {}
				}
				// Move deeper into the tree structure
				currentLevel = currentLevel[categoryName] as CategoryTree
			}
		}
	}

	return categoryTree
}
