import {
	CustomError,
	VoilaProductError,
} from "./errors/CustomError"
import { ErrorType } from "./errors/types"
import { isVoilaProductArray } from "./types/helpers"
import type {
	CategoryTree,
	MinimalPrice,
	Voila,
} from "./types/index"

export function getMinimalPrice(
	product: Voila.DecoratedProduct
): MinimalPrice {
	return {
		currentPrice: product.promoPrice
			? product.promoPrice.amount
			: product.price.amount,
		originalPrice: product.price.amount,
	}
}
export function categoryTreeFromProducts({
	products,
	depth: depthIndexParam,
	/**
	 * only applies to
	 */
	errorHandling = "throw",
}: {
	products: Voila.Product[]
	depth?: number
	errorHandling?: "throw" | "warn"
}): CategoryTree {
	const categoryTree: CategoryTree = {}

	if (!products?.length) {
		return {}
	}
	// all products must have the same category path length AND length >= depthIndex
	let pathLength: number | undefined =
		products[0]?.categoryPath.length

	const badCatPathProducts = products.filter(
		(product) =>
			product.categoryPath === undefined ||
			product.categoryPath.length !== pathLength
	)

	const badProducts = badCatPathProducts.map((p) => ({
		productId: p.productId,
		name: p.name,
		categoryPath: p.categoryPath,
	}))

	if (badCatPathProducts.length > 0) {
		const message = `Unexpected Voila.Product['categoryPath']`

		if (errorHandling === "warn") {
			console.warn(message, badProducts)
		} else {
			throw new VoilaProductError(
				ErrorType.BAD_VOILA_CATEGORY_PATH,
				message,
				badProducts
			)
		}
	}

	const depthIndex = Math.min(
		depthIndexParam ?? pathLength - 1,
		pathLength - 1
	)

	for (const product of products) {
		if (
			badProducts.find((p) => p.productId === product.productId)
		) {
			continue
		}
		const depth = Math.min(
			product.categoryPath.length,
			depthIndex
		)
		let currentLevel: CategoryTree = categoryTree

		for (let i = 0; i <= depth; i++) {
			const categoryName = product.categoryPath[i]
			const isLastCategory = i === depth

			if (isLastCategory) {
				if (!currentLevel[categoryName]) {
					currentLevel[categoryName] = [product]
				} else if (
					isVoilaProductArray(currentLevel[categoryName])
				) {
					currentLevel[categoryName].push(product)
				}
			} else {
				if (!currentLevel[categoryName]) {
					currentLevel[categoryName] = {}
				}

				currentLevel = currentLevel[categoryName] as CategoryTree
			}
		}
	}

	return categoryTree
}
/**
 * Decodes HTML entities (e.g., &nbsp;, &rsquo;, &amp;) in a given string.
 * @param html The string containing HTML entities to decode.
 * @returns The decoded plain text string.
 */
export function decodeHtmlEntities(html: string): string {
	const textarea = document.createElement("textarea")

	textarea.innerHTML = html

	return textarea.value
}
