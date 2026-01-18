import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest"
import { PriceTrackerRule } from "./PriceTrackerRule"
import type { PriceTracker } from "@src/types/product/price-tracker"
import { usePriceTracker } from "@src/hooks/usePriceTracker"

// Mock ResizeObserver for Ant Design components
beforeAll(() => {
	global.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
})

vi.mock("@src/hooks/usePriceTracker", () => ({
	usePriceTracker: vi.fn(() => ({
		deleteRule: vi.fn(),
	})),
}))

const mockRule: PriceTracker.Rule = {
	id: "test-rule-id",
	query: "Greek yogurt",
	priceType: "package",
	priceComparison: "<=",
	price: 5.99,
	isSale: null,
	matches: [
		{ product_view: {} as any, similarity: 0.9 },
		{ product_view: {} as any, similarity: 0.8 },
	],
}

describe("PriceTrackerRule", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe("display mode (non-editing)", () => {
		it("shows rule query and matches count", () => {
			render(<PriceTrackerRule rule={mockRule} />)

			expect(screen.getByText("(2) Greek yogurt")).toBeInTheDocument()
		})

		it("shows price and priceType", () => {
			render(<PriceTrackerRule rule={mockRule} />)

			expect(screen.getByText("$5.99 / package")).toBeInTheDocument()
		})

		it("shows 0 matches when matches is empty", () => {
			render(
				<PriceTrackerRule rule={{ ...mockRule, matches: [] }} />,
			)

			expect(screen.getByText("(0) Greek yogurt")).toBeInTheDocument()
		})

		it("shows edit button with edit icon", () => {
			render(<PriceTrackerRule rule={mockRule} />)

			expect(
				screen.getByRole("button", { name: /edit/i }),
			).toBeInTheDocument()
		})

		it("shows delete button in edit mode", () => {
			render(<PriceTrackerRule rule={mockRule} mode="edit" />)

			expect(
				screen.getByRole("button", {
					name: /delete price tracker rule/i,
				}),
			).toBeInTheDocument()
		})
	})

	describe("editing mode", () => {
		it("shows search query input", () => {
			render(<PriceTrackerRule editing={true} />)

			expect(
				screen.getByPlaceholderText("Search Query"),
			).toBeInTheDocument()
		})

		it("shows price input", () => {
			render(<PriceTrackerRule editing={true} />)

			expect(screen.getByPlaceholderText("Price")).toBeInTheDocument()
		})

		it("shows priceType select with options", () => {
			render(<PriceTrackerRule editing={true} />)

			// The select renders a combobox
			expect(screen.getByRole("combobox")).toBeInTheDocument()
		})

		it("shows example queries help text", () => {
			render(<PriceTrackerRule editing={true} />)

			expect(
				screen.getByText(
					/Ex: "Greek yogurt", "3-ply toilet paper"/,
				),
			).toBeInTheDocument()
		})

		it("pre-fills form with rule values when editing existing rule", async () => {
			const user = userEvent.setup()
			render(<PriceTrackerRule rule={mockRule} />)

			// Click edit to enter editing mode
			await user.click(screen.getByRole("button", { name: /edit/i }))

			expect(screen.getByPlaceholderText("Search Query")).toHaveValue(
				"Greek yogurt",
			)
		})
	})

	describe("button labels", () => {
		it("shows 'Create' when editing without existing rule", () => {
			render(<PriceTrackerRule editing={true} />)

			expect(
				screen.getByRole("button", { name: /create/i }),
			).toBeInTheDocument()
		})

		it("shows 'Edit' when editing existing rule", () => {
			render(
				<PriceTrackerRule rule={mockRule} editing={true} mode="edit" />,
			)

			// The submit button should have label "Edit"
			expect(
				screen.getByRole("button", { name: "Edit" }),
			).toBeInTheDocument()
		})
	})

	describe("form submission", () => {
		it("calls onSubmit when form is submitted via Enter key", async () => {
			const user = userEvent.setup()
			const onSubmit = vi.fn(async () => {})

			render(<PriceTrackerRule onSubmit={onSubmit} editing={true} />)

			const searchInput = screen.getByPlaceholderText("Search Query")
			await user.type(searchInput, "Greek yogurt{Enter}")

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1)
			})
		})

		it("calls onSubmit with form values and mode", async () => {
			const user = userEvent.setup()
			const onSubmit = vi.fn(async () => {})

			render(
				<PriceTrackerRule
					onSubmit={onSubmit}
					editing={true}
					mode="create"
				/>,
			)

			const searchInput = screen.getByPlaceholderText("Search Query")
			await user.type(searchInput, "Test query{Enter}")

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledWith(
					expect.objectContaining({ query: "Test query" }),
					expect.any(Function),
					"create",
				)
			})
		})

		it("includes rule id when editing existing rule", async () => {
			const user = userEvent.setup()
			const onSubmit = vi.fn(async () => {})

			render(
				<PriceTrackerRule
					rule={mockRule}
					onSubmit={onSubmit}
					editing={true}
					mode="edit"
				/>,
			)

			const searchInput = screen.getByPlaceholderText("Search Query")
			await user.clear(searchInput)
			await user.type(searchInput, "Updated query{Enter}")

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledWith(
					expect.objectContaining({ id: "test-rule-id" }),
					expect.any(Function),
					"edit",
				)
			})
		})
	})

	describe("cancel editing", () => {
		it("exits editing mode when cancel button is clicked", async () => {
			const user = userEvent.setup()
			render(
				<PriceTrackerRule rule={mockRule} editing={true} mode="edit" />,
			)

			// Verify we're in editing mode
			expect(
				screen.getByPlaceholderText("Search Query"),
			).toBeInTheDocument()

			// Click cancel button
			await user.click(
				screen.getByRole("button", { name: /cancel edititing/i }),
			)

			// Verify we exited editing mode
			expect(
				screen.queryByPlaceholderText("Search Query"),
			).not.toBeInTheDocument()
			expect(screen.getByText("(2) Greek yogurt")).toBeInTheDocument()
		})

		it("does not call onSubmit when cancelling", async () => {
			const user = userEvent.setup()
			const onSubmit = vi.fn(async () => {})

			render(
				<PriceTrackerRule
					rule={mockRule}
					onSubmit={onSubmit}
					editing={true}
					mode="edit"
				/>,
			)

			await user.click(
				screen.getByRole("button", { name: /cancel edititing/i }),
			)

			expect(onSubmit).not.toHaveBeenCalled()
		})
	})

	describe("delete rule", () => {
		it("calls deleteRule when delete is confirmed", async () => {
			const user = userEvent.setup()
			const mockDeleteRule = vi.fn()
			vi.mocked(usePriceTracker).mockReturnValue({
				deleteRule: mockDeleteRule,
			} as any)

			render(<PriceTrackerRule rule={mockRule} mode="edit" />)

			// Click delete button to open confirmation
			await user.click(
				screen.getByRole("button", {
					name: /delete price tracker rule/i,
				}),
			)

			// Confirm deletion
			const confirmButton = await screen.findByRole("button", {
				name: /ok/i,
			})
			await user.click(confirmButton)

			expect(mockDeleteRule).toHaveBeenCalledWith(mockRule)
		})
	})

	describe("edit button", () => {
		it("enters editing mode when clicked", async () => {
			const user = userEvent.setup()
			render(<PriceTrackerRule rule={mockRule} />)

			// Verify not in editing mode
			expect(
				screen.queryByPlaceholderText("Search Query"),
			).not.toBeInTheDocument()

			// Click edit button
			await user.click(screen.getByRole("button", { name: /edit/i }))

			// Verify entered editing mode
			expect(
				screen.getByPlaceholderText("Search Query"),
			).toBeInTheDocument()
		})
	})

	describe("showHelp prop", () => {
		it("shows help button when showHelp is true", () => {
			render(<PriceTrackerRule editing={true} showHelp={true} />)

			expect(
				screen.getByRole("button", {
					name: "Search for something and add a price, we'll let you know when anything matches.",
				}),
			).toBeInTheDocument()
		})

		it("does not show help button when showHelp is false", () => {
			render(<PriceTrackerRule editing={true} showHelp={false} />)

			expect(
				screen.queryByRole("button", {
					name: "Search for something and add a price, we'll let you know when anything matches.",
				}),
			).not.toBeInTheDocument()
		})
	})

	describe("mode prop", () => {
		it("does not show delete or cancel buttons in create mode", () => {
			render(
				<PriceTrackerRule
					rule={mockRule}
					editing={true}
					mode="create"
				/>,
			)

			expect(
				screen.queryByRole("button", {
					name: /delete price tracker rule/i,
				}),
			).not.toBeInTheDocument()
			expect(
				screen.queryByRole("button", { name: /cancel edititing/i }),
			).not.toBeInTheDocument()
		})
	})
})
