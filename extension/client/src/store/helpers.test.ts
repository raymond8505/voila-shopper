import { expect, test, vi, describe } from "vitest"
import {
	setLocalStorageStore,
	getLocalStorageStore,
	STORE_KEY,
} from "./helpers"
import { Store } from "antd/es/form/interface"

describe("setLocalStorageStore", () => {
	test("stringifies and sets the store in localStorage", () => {
		const setItemSpy = vi.spyOn(Storage.prototype, "setItem")

		const state: Partial<Store> = {
			ingredients: [],
		}

		setLocalStorageStore(state)

		expect(setItemSpy).toHaveBeenCalledWith(STORE_KEY, JSON.stringify(state))
	})
})
describe("getLocalStorageStore", () => {
	test("parses and returns the store from localStorage", () => {
		const getItemSpy = vi.spyOn(Storage.prototype, "getItem")

		const expectedState: Partial<Store> = {
			ingredients: [],
		}

		getItemSpy.mockReturnValue(JSON.stringify(expectedState))

		const result = getLocalStorageStore()

		expect(getItemSpy).toHaveBeenCalledWith(STORE_KEY)
		expect(result).toEqual(expectedState)
	})
})
