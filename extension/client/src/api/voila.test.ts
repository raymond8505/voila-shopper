import { describe, expect, test, vi } from "vitest"
import { fetchPromotionPage } from "./voila"

describe("fetchPromotionPage", () => {
	test("appends pageToken if defined", async () => {
		const fetchSpy = vi.spyOn(window, "fetch")

		fetchPromotionPage("test")
		expect(fetchSpy).toHaveBeenCalledWith(
			expect.stringContaining("pageToken=test"),
			expect.anything()
		)

		fetchPromotionPage()
		expect(fetchSpy).toHaveBeenCalledWith(
			expect.not.stringContaining("pageToken=test"),
			expect.anything()
		)
	})
})
