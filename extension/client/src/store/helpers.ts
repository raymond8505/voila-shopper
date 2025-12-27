import type { Store as ClientStore } from "./client/index"

export const STORE_KEY = "vs-store"

export function setLocalStorageStore(
	state: Partial<ClientStore>
): Partial<ClientStore> {
	window?.localStorage?.setItem(STORE_KEY, JSON.stringify(state))
	return state
}

export function getLocalStorageStore(): Partial<ClientStore> {
	try {
		const storedVal = window?.localStorage?.getItem(STORE_KEY)

		return storedVal ? JSON.parse(storedVal) : {}
	} catch (e) {
		return {}
	}
}
