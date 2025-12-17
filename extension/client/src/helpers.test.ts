import { beforeEach, describe, expect, test, vi } from "vitest"
import { product } from "./api/voila.fixtures"
import { Voila } from "./types/voila/index"
import { categoryTreeFromProducts } from "./helpers"

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
