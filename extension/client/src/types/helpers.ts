import { Product } from "./product"
import type { Voila } from "./voila"
import { Recipe } from "./recipe/index"

/**
 * Type guard to check if an object is a Voila.Product.
 * @param obj The object to check.
 * @returns True if the object is a Voila.Product, false otherwise.
 */
export function isVoilaProduct(
	obj: unknown
): obj is Voila.Product {
	if (typeof obj !== "object" || obj === null) {
		return false
	}

	const product = obj as Voila.Product

	return (
		typeof product.productId === "string" &&
		typeof product.name === "string" &&
		typeof product.price === "object" &&
		product.price !== null &&
		typeof product.price.amount === "string" &&
		typeof product.available === "boolean" &&
		Array.isArray(product.categoryPath)
	)
}

/**
 * Type guard to check if an object is an array of Voila.Product.
 * @param obj The object to check.
 * @returns True if the object is an array of Voila.Product, false otherwise.
 */
export function isVoilaProductArray(
	obj: unknown
): obj is Voila.Product[] {
	return Array.isArray(obj) && obj.every(isVoilaProduct)
}

export function isCreateProductsResponse(
	response: unknown
): response is { products: Product.WithPriceIntelligence[] } {
	if (typeof response !== "object" || response === null) {
		return false
	}

	const resp = response as { products: unknown }

	return (
		typeof resp.products === "object" &&
		resp.products !== null &&
		Array.isArray(resp.products)
	)
}

export function isHowToSection(
	section: unknown
): section is Recipe.HowToSection {
	if (
		!section ||
		typeof section !== "object" ||
		section?.["@type"] !== "HowToSection"
	) {
		return false
	}

	return true
}

export function isHowToStep(
	section: unknown
): section is Recipe.HowToStep {
	if (
		!section ||
		typeof section !== "object" ||
		section?.["@type"] !== "HowToStep"
	) {
		return false
	}

	return true
}
