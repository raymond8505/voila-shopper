import { TypedResponse, Voila } from "../types/index"

export async function voilaRequest<T = unknown>({
	fetchOpts,
	url,
}: {
	fetchOpts?: RequestInit
	url: string
}): Promise<TypedResponse<T>> {
	return fetch(url, {
		method: fetchOpts?.method || "GET",
		credentials: "include",
		mode: "cors",
		...fetchOpts,
		headers: {
			accept: "application/json; charset=utf-8",
			"accept-language": "en-US,en-CA;q=0.9,en-GB;q=0.8,en;q=0.7",
			"client-route-id": "147a3656-b4f7-409a-9ffd-aeec770d6c79",
			"content-type": "application/json; charset=utf-8",
			"ecom-request-source": "web",
			"ecom-request-source-version": "2.0.0-2025-11-14-15h06m17s-68a4855f",
			"page-view-id": "ac6da76b-d925-412d-a1a0-fd05d5b1111e",
			priority: "u=1, i",
			"sec-ch-ua":
				'"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-csrf-token": window.__INITIAL_STATE__?.session.csrf.token ?? "",
			...fetchOpts?.headers,
		},
	})
}
export async function fetchPromotionPage(pageToken?: string) {
	const url = new URL(
		"https://voila.ca/api/product-listing-pages/v1/pages/promotions"
	)
	url.searchParams.append("maxPageSize", "300")
	url.searchParams.append("maxProductsToDecorate", "150")
	url.searchParams.append(
		"regionId",
		window.__INITIAL_STATE__?.session.metadata.regionId ?? ""
	)

	if (pageToken) {
		url.searchParams.append("pageToken", pageToken)
	}
	const resp = await voilaRequest<Voila.FetchPromotionPageResponse>({
		url: url.toString(),
		fetchOpts: {},
	})

	return await resp.json()
}
export async function fetchProducts(ids: string[]) {

	const resp = await voilaRequest<Voila.FetchProductsResponse>({
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
	return await (
		await voilaRequest<Voila.AddToCartResponse>({
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
	).json()
}

export async function fetchCartProducts() {
	const resp = await voilaRequest<{ items: Voila.Product[] }>({
		url: "https://voila.ca/api/cart/v1/meta/carts/active/products",
	})

	const ids = (await resp.json()).items.map((item) => item.productId)
	return await fetchProducts(ids)
}
