import { parse } from "path"
import {
	isoDurationToMs,
	parseISODuration,
	shouldPluralize,
} from "../../helpers"
import { AbbreviatedDurationUnit } from "./AbbreviatedDurationUnit"

/**
 * Takes an an ISO 8601 duration string, formats it to be human readable
 * and wraps it in a time element.
 * If the given duration is not the correct format, it outputs that verbatim
 * and skips putting it in dateTime
 */
export function Duration({ duration }: { duration?: string }) {
	if (!duration) return null

	const parsedDuration = parseISODuration(duration)
	const durationMs = parsedDuration
		? isoDurationToMs(parsedDuration)
		: undefined

	const durationMins = durationMs
		? durationMs / 1000 / 60
		: undefined

	return (
		<time dateTime={parsedDuration ? duration : undefined}>
			{parsedDuration && durationMins && durationMs ? (
				<>
					{durationMins >= 1 ? (
						<AbbreviatedDurationUnit
							unit={{
								value: Math.round(durationMins),
								label: `Minute${
									shouldPluralize(Math.round(durationMins))
										? "s"
										: ""
								}`,
								abbrLabel: `Min${
									shouldPluralize(Math.round(durationMins))
										? "s"
										: ""
								}`,
							}}
						/>
					) : (
						<AbbreviatedDurationUnit
							unit={{
								value: Math.round(durationMs / 1000),
								label: `Second${
									shouldPluralize(Math.round(durationMs / 1000))
										? "s"
										: ""
								}`,
								abbrLabel: `Sec${
									shouldPluralize(Math.round(durationMs / 1000))
										? "s"
										: ""
								}`,
							}}
						/>
					)}
				</>
			) : (
				duration
			)}
		</time>
	)
}
