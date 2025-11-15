import { useCallback } from "react"

import { fetchProducts } from "../api/voila"
import { Voila } from "../types"

export function useVoila() {
	const getProducts: (ids: string[]) => Promise<Voila.FetchProductsResponse> =
		useCallback(async (ids: string[]) => {
			return await fetchProducts(ids)
		}, [])

	return { getProducts }
}
