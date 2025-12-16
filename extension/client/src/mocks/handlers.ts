import { http, HttpResponse } from "msw"

export const handlers = [
	// An example handler
	http.get("https://xonkmdhnjpjkapnsmltu.supabase.co/rest/v1/jobs?*", () => {
		return HttpResponse.json({ name: "John Maverick" })
	}),
]
