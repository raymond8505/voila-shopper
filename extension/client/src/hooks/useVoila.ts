import { useCallback } from "react"
import { fetchProducts, fetchPromotionPage } from "../api/voila"
import { Voila } from "../types"
import { useQueryClient } from "@tanstack/react-query"

export function useVoila() {
	const getProducts = useCallback(
		async (ids: string[]): Promise<Voila.FetchProductsResponse> => {
			return await fetchProducts(ids)
		},
		[]
	)

	const queryClient = useQueryClient()

	const getPromotionProducts = useCallback(
		async (limit: number = 1000): Promise<Voila.DecoratedProduct[]> => {
			return new Promise(async (resolve) => {
				let products: Voila.DecoratedProduct[] = []

				let pageToken: string | undefined = undefined

				async function getPromoPageProds() {
					//const pageResp = await fetchPromotionPage(pageToken)

					const { productGroups, metadata } = await queryClient.fetchQuery({
						queryKey: ["promotion-page", pageToken],
						queryFn: () => fetchPromotionPage(pageToken),
						staleTime: 12 * 60 * 60 * 1000, // 12 hours
					})

					const nextPageToken = metadata.nextPageToken

					const pageProducts = productGroups.flatMap(
						(group) => group.decoratedProducts
					)

					products = [...products, ...pageProducts]

					if (nextPageToken && products.length <= limit) {
						pageToken = nextPageToken
						setTimeout(getPromoPageProds, 1000)
					} else {
						resolve(products.slice(0, limit - 1))
					}
				}

				getPromoPageProds()
			})
		},
		[queryClient]
	)
	return { getProducts, getPromotionProducts }
}
