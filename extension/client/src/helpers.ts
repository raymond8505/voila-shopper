import { VoilaProductError } from "./errors/CustomError"
import { ErrorType } from "./errors/types"
import { isVoilaProductArray } from "./types/helpers"

import type {
	CategoryTree,
	MinimalPrice,
	Voila,
} from "./types/index"
import { PriceTracker } from "./types/product/price-tracker"

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
/**
 * Takes an array of products and sorts them into a tree
 * based on their categoryPath
 */
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
					const productArray = currentLevel[
						categoryName
					] as Voila.Product[]
					productArray.push(product)
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
 */
export function decodeHtmlEntities(html: string): string {
	const textarea = document.createElement("textarea")

	textarea.innerHTML = html

	return textarea.value
}

export interface ParsedISODurationUnit {
	value: number
	label: string
	abbrLabel: string
}

export interface ParsedISODuration {
	days: ParsedISODurationUnit
	hours: ParsedISODurationUnit
	minutes: ParsedISODurationUnit
	seconds: ParsedISODurationUnit
}

export function shouldPluralize(val: unknown) {
	const parsedVal = parseInt(val?.toString() || "0")

	return parsedVal === 0 || Math.abs(parsedVal) > 1
}

/**
 * Parses an ISO 8601 duration string and returns an object with days, hours, minutes, and seconds.
 * Example: "P1DT2H30M" -> { days: 1, hours: 2, minutes: 30, seconds: 0 }
 * @returns An object with the parsed duration components, or null if malformed
 */
export function parseISODuration(
	duration: string
): ParsedISODuration | null {
	const regex =
		/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/

	const matches = duration.match(regex)

	if (!matches) {
		console.warn(
			`${duration} does not appear to be a valid ISO 8601 duration string`
		)
		return null
	}

	const [, days, hours, minutes, seconds] = matches

	return {
		days: {
			value: parseInt(days) || 0,
			label: `Day${shouldPluralize(days) ? "s" : ""}`,
			abbrLabel: `Day${shouldPluralize(days) ? "s" : ""}`,
		},
		hours: {
			value: parseInt(hours) || 0,
			label: `Hour${shouldPluralize(hours) ? "s" : ""}`,
			abbrLabel: `Hr${shouldPluralize(hours) ? "s" : ""}`,
		},
		minutes: {
			value: parseInt(minutes) || 0,
			label: `Minute${shouldPluralize(minutes) ? "s" : ""}`,
			abbrLabel: `Min${shouldPluralize(minutes) ? "s" : ""}`,
		},
		seconds: {
			value: parseInt(seconds) || 0,
			label: `Second${shouldPluralize(seconds) ? "s" : ""}`,
			abbrLabel: `Sec${shouldPluralize(seconds) ? "s" : ""}`,
		},
	}
}

/**
 * Takes a processed ISO duration and converts to milliseconds
 * @returns
 */
export function isoDurationToMs(
	duration: ParsedISODuration
): number {
	const { days, hours, minutes, seconds } = duration

	return (
		(days.value * 24 * 60 * 60 +
			hours.value * 60 * 60 +
			minutes.value * 60 +
			seconds.value) *
		1000
	)
}
/**
 * Gets the difference between 2 prices
 */
export function getPriceDifference(
	currentPrice: number,
	comparePrice: number
) {
	const decimal = currentPrice - comparePrice
	const percent = decimal / comparePrice

	return {
		decimal,
		percent,
	}
}

export function trimUnit(str?: string) {
	return str ? str.replace(/(g|kcal)$/gi, "") : str
}

export function rulesAreEqual(
	ruleA: PriceTracker.Rule,
	ruleB: PriceTracker.Rule
): boolean {
	const ruleAWithoutMatches = { ...ruleA, matches: undefined }
	const ruleBWithoutMatches = { ...ruleB, matches: undefined }

	return (
		JSON.stringify(ruleAWithoutMatches) ===
		JSON.stringify(ruleBWithoutMatches)
	)
}
