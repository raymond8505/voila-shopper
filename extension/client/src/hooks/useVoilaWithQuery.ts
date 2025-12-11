import { useCallback, useState } from "react"
import { fetchProducts, fetchPromotionPage } from "../api/voila"
import { Voila } from "../types"
import {
	useQuery,
	keepPreviousData,
	useInfiniteQuery,
} from "@tanstack/react-query"

export function useVoila() {
	const [promosLimit, setPromosLimit] = useState<number | undefined>(undefined)
	const [nextPageToken, setNextPageToken] = useState<string | undefined>(
		undefined
	)
	const getProducts = useCallback(
		async (ids: string[]): Promise<Voila.FetchProductsResponse> => {
			return await fetchProducts(ids)
		},
		[]
	)

	const { data: promoProductsOLD } = useQuery({
		queryKey: ["promo-prods-old", promosLimit, nextPageToken],
		enabled: false, //promosLimit !== undefined,

		queryFn: async (q) => {
			const pageResp = await fetchPromotionPage(nextPageToken)

			const newPageToken = pageResp.metadata.nextPageToken

			console.log({ newPageToken, promoProducts })

			if (!promoProducts || promoProducts.length < promosLimit) {
				setNextPageToken(newPageToken)
			}

			const pageProducts = pageResp.productGroups.flatMap(
				(group) => group.decoratedProducts
			)

			return [...promoProducts, ...pageProducts].slice(0, promosLimit)
		},

		placeholderData: keepPreviousData,
	})

	const { data: promoProducts, fetchNextPage } = useInfiniteQuery<
		Voila.DecoratedProduct[]
	>({
		queryKey: ["promo-prods", promosLimit, nextPageToken],
		enabled: false, //promosLimit !== undefined,

		queryFn: async (q) => {
			const pageResp = await fetchPromotionPage(nextPageToken)

			const newPageToken = pageResp.metadata.nextPageToken

			console.log({ newPageToken, promoProducts })

			if (!promoProducts || promoProducts.length < promosLimit) {
				setNextPageToken(newPageToken)
			}

			const pageProducts = pageResp.productGroups.flatMap(
				(group) => group.decoratedProducts
			)

			return [...promoProducts, ...pageProducts].slice(0, promosLimit)
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.metadata.nextPageToken,
	})

	const getPromotionProducts = useCallback(
		async (limit: number = 301): Promise<Voila.DecoratedProduct[]> => {
			console.log("promo prods")
			setPromosLimit(limit)
			return []
		},
		[]
	)

	// const getPromotionProductsOLD = useCallback(
	// 	async (limit: number = 2000): Promise<Voila.DecoratedProduct[]> => {
	// 		return new Promise(async (resolve) => {
	// 			let products: Voila.DecoratedProduct[] = []

	// 			let pageToken: string | undefined = undefined

	// 			async function getPromoPageProds() {
	// 				const pageResp = await fetchPromotionPage(pageToken)

	// 				const nextPageToken = pageResp.metadata.nextPageToken

	// 				const pageProducts = pageResp.productGroups.flatMap(
	// 					(group) => group.decoratedProducts
	// 				)

	// 				products = [...products, ...pageProducts]

	// 				if (nextPageToken && products.length <= limit) {
	// 					pageToken = nextPageToken
	// 					setTimeout(getPromoPageProds, limit)
	// 				} else {
	// 					resolve(products.slice(0, limit - 1))
	// 				}
	// 			}

	// 			getPromoPageProds()
	// 		})
	// 	},
	// 	[]
	// )
	return { getProducts, getPromotionProducts }
}
