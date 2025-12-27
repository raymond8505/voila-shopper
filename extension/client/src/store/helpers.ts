import type { Store } from "./client/index"

export const STORE_KEY = "vs-store"

export function setLocalStorageStore(
	state: Partial<Store>
): Partial<Store> {
	window?.localStorage?.setItem(STORE_KEY, JSON.stringify(state))
	return state
}

export function getLocalStorageStore(): Partial<Store> {
	try {
		const storedVal = window?.localStorage?.getItem(STORE_KEY)

		return storedVal ? JSON.parse(storedVal) : {}
	} catch (e) {
		return {}
	}
}
