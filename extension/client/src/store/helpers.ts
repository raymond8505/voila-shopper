import type { Store as ClientStore } from "./client/index"
import { ProductsStore } from "./products"

export const STORE_KEY = "vs-store"

export interface LocalStorageStore {
	client?: Partial<ClientStore>
	products?: Partial<ProductsStore>
}

export function setLocalStorageStore(
	state: Partial<ClientStore> | Partial<ProductsStore>,
	store: "client" | "products"
): Partial<ClientStore> | Partial<ProductsStore> {
	const storeState = state
	const prevState = getLocalStorageStore()
	const newStore = JSON.stringify({
		...prevState,
		[store]: storeState,
	})
	window?.localStorage?.setItem(STORE_KEY, newStore)
	return state
}

export function getLocalStorageStore(): LocalStorageStore {
	try {
		const storedVal = window?.localStorage?.getItem(STORE_KEY)

		return storedVal ? JSON.parse(storedVal) : {}
	} catch (e) {
		return {}
	}
}
