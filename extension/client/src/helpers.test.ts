import {
	afterEach,
	beforeEach,
	describe,
	expect,
	test,
	vi,
} from "vitest"
import { product } from "./api/voila.fixtures"
import { Voila } from "./types/voila/index"
import {
	categoryTreeFromProducts,
	parseISODuration,
	isoDurationToMs,
} from "./helpers"

describe("categoryTreeFromProducts", () => {
	const oneCategoryProduct: Voila.Product = {
		...product,
		categoryPath: ["Category One"],
	}

	const twoCategoryProduct: Voila.Product = {
		...product,
	}

	twoCategoryProduct.categoryPath = [
		"Category One",
		"Category Two",
	]

	const categoryThreeProduct: Voila.Product = {
		...product,
	}

	categoryThreeProduct.categoryPath = [
		"Category One",
		"Category Two",
		"Category Three",
	]

	const categoryFourProduct: Voila.Product = {
		...product,
	}

	categoryFourProduct.categoryPath = [
		"Category One",
		"Category Two",
		"Category Three",
	]

	const categoryFiveProduct: Voila.Product = {
		...product,
	}

	categoryFiveProduct.categoryPath = [
		"Category One",
		"Category Five",
		"Category Six",
	]

	test("puts products in their correct category tree branch", () => {
		const categoryTree = categoryTreeFromProducts({
			products: [
				categoryThreeProduct,
				categoryFourProduct,
				categoryFiveProduct,
			],
		})

		// prettier-ignore
		expect(
            categoryTree
                [categoryThreeProduct.categoryPath[0]]
                [categoryThreeProduct.categoryPath[1]]
                [categoryThreeProduct.categoryPath[2]]
		)
        .toEqual([categoryThreeProduct,categoryFourProduct])

		// prettier-ignore
		expect(
            categoryTree
                [categoryFiveProduct.categoryPath[0]]
                [categoryFiveProduct.categoryPath[1]]
                [categoryFiveProduct.categoryPath[2]]
		)
        .toEqual([categoryFiveProduct])
	})

	test("stops at depth index if defined", () => {
		const categoryTree = categoryTreeFromProducts({
			products: [categoryThreeProduct],
			depth: 1,
		})

		// prettier-ignore
		expect(
			categoryTree
                [categoryThreeProduct.categoryPath[0]]
                [categoryThreeProduct.categoryPath[1]]
		).toEqual([categoryThreeProduct])

		// prettier-ignore
		expect(
			categoryTree
                [categoryThreeProduct.categoryPath[0]]
                [categoryThreeProduct.categoryPath[1]]
                [categoryThreeProduct.categoryPath[2]]
		).toBeUndefined()
	})

	test("defaults to full categoryPath depth", () => {
		const categoryTree = categoryTreeFromProducts({
			products: [categoryThreeProduct],
		})

		// prettier-ignore
		expect(
            categoryTree
                [categoryThreeProduct.categoryPath[0]]
                [categoryThreeProduct.categoryPath[1]]
                [categoryThreeProduct.categoryPath[2]]
		)
        .toEqual([categoryThreeProduct])
	})

	describe("Errors", () => {
		describe("incorrect path lengths", () => {
			beforeEach(() => {
				vi.resetAllMocks()
			})
			const warnSpy = vi.spyOn(window.console, "warn")

			test("warns on warn", () => {
				expect(() => {
					categoryTreeFromProducts({
						products: [oneCategoryProduct, categoryFiveProduct],
						errorHandling: "warn",
					})
				}).not.toThrowError()
				expect(warnSpy).toHaveBeenCalled()
			})
			test("throws on throw", () => {
				expect(() => {
					categoryTreeFromProducts({
						products: [oneCategoryProduct, categoryFiveProduct],
						errorHandling: "throw",
					})
				}).toThrowError()
				expect(console.warn).not.toHaveBeenCalled()
			})
		})
	})
})
describe("parseISODuration", () => {
	let warnSpy: any

	beforeEach(() => {
		warnSpy = vi
			.spyOn(console, "warn")
			.mockImplementation(() => {})
	})

	afterEach(() => {
		warnSpy.mockRestore()
	})

	test("parses a full ISO duration string", () => {
		const result = parseISODuration("P1DT2H30M45S")
		expect(result?.days.value).toBe(1)
		expect(result?.hours.value).toBe(2)
		expect(result?.minutes.value).toBe(30)
		expect(result?.seconds.value).toBe(45)
	})

	test("parses a duration with only days", () => {
		const result = parseISODuration("P5D")
		expect(result?.days.value).toBe(5)
		expect(result?.hours.value).toBe(0)
		expect(result?.minutes.value).toBe(0)
		expect(result?.seconds.value).toBe(0)
	})

	test("parses a duration with only time components", () => {
		const result = parseISODuration("PT10H5M")
		expect(result?.days.value).toBe(0)
		expect(result?.hours.value).toBe(10)
		expect(result?.minutes.value).toBe(5)
		expect(result?.seconds.value).toBe(0)
	})

	test("parses a duration with only seconds", () => {
		const result = parseISODuration("PT15S")
		expect(result?.days.value).toBe(0)
		expect(result?.hours.value).toBe(0)
		expect(result?.minutes.value).toBe(0)
		expect(result?.seconds.value).toBe(15)
	})

	test("returns null and warns for a malformed duration string", () => {
		const result = parseISODuration("invalid-duration")
		expect(result).toBeNull()
		expect(warnSpy).toHaveBeenCalledWith(
			"invalid-duration does not appear to be a valid ISO 8601 duration string"
		)
	})

	test("handles zero values correctly", () => {
		const result = parseISODuration("P0DT0H0M0S")
		expect(result?.days.value).toBe(0)
		expect(result?.hours.value).toBe(0)
		expect(result?.minutes.value).toBe(0)
		expect(result?.seconds.value).toBe(0)
	})

	test("handles empty but valid duration string 'P'", () => {
		const result = parseISODuration("P")
		expect(result?.days.value).toBe(0)
		expect(result?.hours.value).toBe(0)
		expect(result?.minutes.value).toBe(0)
		expect(result?.seconds.value).toBe(0)
	})

	test("handles empty but valid time duration string 'PT'", () => {
		const result = parseISODuration("PT")
		expect(result?.days.value).toBe(0)
		expect(result?.hours.value).toBe(0)
		expect(result?.minutes.value).toBe(0)
		expect(result?.seconds.value).toBe(0)
	})

	test("generates correct pluralization for labels", () => {
		const result = parseISODuration("P1DT2H1M0S")
		expect(result?.days.label).toBe("Day")
		expect(result?.hours.label).toBe("Hours")
		expect(result?.minutes.label).toBe("Minute")
		expect(result?.seconds.label).toBe("Seconds")
	})
})
describe("isoDurationToMs", () => {
	test("converts a full duration to milliseconds", () => {
		const duration = parseISODuration("P1DT2H30M45S")
		const expectedMs =
			(1 * 24 * 60 * 60 + 2 * 60 * 60 + 30 * 60 + 45) * 1000
		expect(isoDurationToMs(duration!)).toBe(expectedMs)
	})
})
