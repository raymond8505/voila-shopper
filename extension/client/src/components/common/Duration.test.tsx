import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import { Duration } from "./Duration"

describe("Duration", () => {
	test("renders nothing if duration is undefined", () => {
		render(<Duration duration={undefined} />)
		expect(screen.queryByRole("time")).not.toBeInTheDocument()
	})

	test("renders total minutes for a duration over 1 minute", () => {
		render(<Duration duration="PT1H30M" />) // 90 minutes

		const timeElement = screen.getByRole("time")
		expect(timeElement).toHaveAttribute("datetime", "PT1H30M")

		expect(screen.getByText("90")).toBeInTheDocument()
		expect(screen.getByTitle("Minutes")).toHaveTextContent(
			"Mins"
		)
		expect(
			screen.queryByTitle("Seconds")
		).not.toBeInTheDocument()
	})

	test("renders total seconds for a duration under 1 minute", () => {
		render(<Duration duration="PT45S" />)

		const timeElement = screen.getByRole("time")
		expect(timeElement).toHaveAttribute("datetime", "PT45S")

		expect(screen.getByText("45")).toBeInTheDocument()
		expect(screen.getByTitle("Seconds")).toHaveTextContent(
			"Secs"
		)
		expect(
			screen.queryByTitle("Minutes")
		).not.toBeInTheDocument()
	})

	test("renders singular 'Min' for exactly 1 minute", () => {
		render(<Duration duration="PT1M" />)
		expect(screen.getByText("1")).toBeInTheDocument()
		expect(screen.getByTitle("Minute")).toHaveTextContent("Min")
	})

	test("rounds down to the nearest minute", () => {
		render(<Duration duration="PT1M29S" />) // 1.48 minutes
		expect(screen.getByText("1")).toBeInTheDocument()
		expect(screen.getByTitle("Minute")).toHaveTextContent("Min")
	})

	test("rounds up to the nearest minute", () => {
		render(<Duration duration="PT1M31S" />) // 1.52 minutes
		expect(screen.getByText("2")).toBeInTheDocument()
		expect(screen.getByTitle("Minutes")).toHaveTextContent(
			"Mins"
		)
	})

	test("renders seconds for a duration of exactly 59 seconds", () => {
		render(<Duration duration="PT59S" />)
		expect(screen.getByText("59")).toBeInTheDocument()
		expect(screen.getByTitle("Seconds")).toHaveTextContent(
			"Secs"
		)
	})
})
