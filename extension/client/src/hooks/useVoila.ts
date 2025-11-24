import { useCallback } from "react"
import { fetchProducts, fetchPromotionPage } from "../api/voila"
import { Voila } from "../types"

export function useVoila() {
	const getProducts = useCallback(
		async (ids: string[]): Promise<Voila.FetchProductsResponse> => {
			return await fetchProducts(ids)
		},
		[]
	)
	const getPromotionProducts = useCallback(async (): Promise<
		Voila.DecoratedProduct[]
	> => {
		return new Promise(async (resolve) => {
			let products: Voila.DecoratedProduct[] = []

			let pageToken: string | undefined = undefined

			async function getPromoPageProds() {
				const pageResp = await fetchPromotionPage(pageToken)

				const nextPageToken = pageResp.metadata.nextPageToken

				const pageProducts = pageResp.productGroups.flatMap(
					(group) => group.decoratedProducts
				)

				products = [...products, ...pageProducts]

				if (nextPageToken) {
					pageToken = nextPageToken
					setTimeout(getPromoPageProds, 2000)
				} else {
					resolve(products)
				}
			}

			getPromoPageProds()
		})
	}, [])
	return { getProducts, getPromotionProducts }
}
