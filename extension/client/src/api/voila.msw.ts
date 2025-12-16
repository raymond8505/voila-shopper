/**
 * @fileoverview MSW handlers for all endpoints used in ./voila.ts
 */
import { http, HttpResponse } from "msw"
import { addToCartResponse, fetchProductsResponse, fetchPromotionPageResponse } from "./voila.fixtures"
import type { Voila } from "../types"

export default [
	/**
     * @see: fetchPromotionPage
     * 
    */
	http.get("https://voila.ca/api/product-listing-pages/v1/pages/promotions*", () => {
		return HttpResponse.json<Voila.FetchPromotionPageResponse>(fetchPromotionPageResponse)
	}),
    /**
     * @see: fetchProducts
     */
    http.put("https://voila.ca/api/webproductpagews/v6/products*", () => {
		return HttpResponse.json<Voila.FetchProductsResponse>(fetchProductsResponse)
	}),
    /**
     * @see: addToCart
     */
    http.post("https://voila.ca/api/cart/v1/carts/active/add-items", () => {
        return HttpResponse.json<Voila.AddToCartResponse>(addToCartResponse)
    }),
    /**
     * @see: fetchCartProducts
     */
    http.get("https://voila.ca/api/cart/v1/meta/carts/active/products", () => {
        return HttpResponse.json<{ items: Voila.Product[] }>({ items: [] })
    })
]
