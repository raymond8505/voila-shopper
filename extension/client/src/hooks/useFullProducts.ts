import { useStore as useProductStore } from "@store/products"
import { useQueryClient } from "@tanstack/react-query"
import { supabaseRequest } from "@src/api/supabase"
import { useCallback } from "react"
import { ProductView } from "@src/types/product/product-view"

export function useFullProducts() {
	const { products } = useProductStore()
	const queryClient = useQueryClient()

	const getProductById = useCallback(
		async (id?: string) => {
			if (!id) {
				return undefined
			}

			// try to find it in store
			const storeProduct = products.find(
				(p) => p.full?.id === id,
			)
			if (storeProduct) {
				return storeProduct.full
			}

			// try to query from db
			const dbProduct = queryClient.fetchQuery({
				queryKey: ["get_complete_product_view", id],
				queryFn: async () => {
					const response = await supabaseRequest({
						table: "/rpc/get_complete_product_view",
						tableParams: {},
						opts: {
							method: "POST",
							body: JSON.stringify({ p_product_id: id }),
						},
					})
					return (await response.json()) as ProductView.ProductView
				},
			})

			return dbProduct
		},
		[products, queryClient],
	)

	return {
		products,
		getProductById,
	}
}
