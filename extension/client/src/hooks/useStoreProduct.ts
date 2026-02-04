import { useStore as useProductStore } from "@store/products"

import { shallow } from "zustand/shallow"

export function useStoreProduct(productId?: string) {
	return useProductStore(
		(state) =>
			state.products.find(
				(p) => p.full?.product.id === productId,
			),
		shallow,
	)
}
