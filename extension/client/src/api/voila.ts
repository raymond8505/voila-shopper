import fetchProductsResponse from "../testing/fixtures/fetchProductsResponse.json"
import { Voila } from "../types"

const isLocal = window.location.hostname === "localhost"

export async function voilaRequest({
	fetchOpts,
	url,
}: {
	fetchOpts?: RequestInit
	url: string
}) {
	return fetch(url, {
		method: fetchOpts?.method || "GET",
		credentials: "include",
		...fetchOpts,
		headers: {
			accept: "application/json; charset=utf-8",
			"accept-language": "en-US,en-CA;q=0.9,en-GB;q=0.8,en;q=0.7",
			"client-route-id": "b19c13ea-7c4b-4c21-97c4-033572d72042",
			"content-type": "application/json; charset=utf-8",
			"ecom-request-source": "web",
			"ecom-request-source-version": "2.0.0-2025-11-13-17h02m07s-309079bb",
			origin: "https://voila.ca",
			"page-view-id": "19983f44-3b74-4cfe-b8c6-259c3831d32c",
			priority: "u=1, i",
			referer:
				"https://voila.ca/promotions/fresh-fruits-vegetables/WEB1100606?sortBy=relevance",
			"sec-ch-ua":
				'"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
			"x-csrf-token": "3c6ec5fe-8b71-44e5-a80b-59f2a8dc63c8",
			...fetchOpts?.headers,
		},
	})
}

export async function fetchProducts(
	ids: string[]
): Promise<Voila.FetchProductsResponse> {
	if (isLocal) {
		return fetchProductsResponse as Voila.FetchProductsResponse
	}

	const resp = await voilaRequest({
		url: "https://voila.ca/api/webproductpagews/v6/products",
		fetchOpts: {
			method: "PUT",
			body: JSON.stringify(ids),
		},
	})

	return await resp.json()
}

export async function addToCart({
	productId,
	quantity,
}: {
	productId: string
	quantity: number
}) {
	return await voilaRequest({
		url: "https://voila.ca/api/cart/v1/carts/active/add-items",
		fetchOpts: {
			method: "POST",
			body: JSON.stringify([
				{
					productId,
					quantity,
				},
			]),
		},
	})
}

export async function fetchCartProducts() {
	const resp = await voilaRequest({
		url: "https://voila.ca/api/cart/v1/meta/carts/active/products",
	})

	const ids = (await resp.json()).items.map((item) => item.productId)
	return await fetchProducts(ids)
}
