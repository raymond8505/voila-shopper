import { http, HttpResponse } from "msw"
import { fetchPromotionPageResponse } from "./voila.fixtures"
import type { Voila } from "../types"

export default [
	// An example handler
	http.get("https://voila.ca/api/product-listing-pages/v1/pages/promotions*", () => {
		return HttpResponse.json<Voila.FetchPromotionPageResponse>(fetchPromotionPageResponse)
	}),
]
