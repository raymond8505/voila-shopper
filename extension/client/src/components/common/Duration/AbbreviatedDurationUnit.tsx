import { ParsedISODurationUnit } from "@src/helpers"

/**
 * Takes a parsed duration unit and renders it with an abbr element
 */
export function AbbreviatedDurationUnit({
	unit,
}: {
	unit: ParsedISODurationUnit
}) {
	return (
		<span>
			<span>{unit.value}</span>{" "}
			<abbr title={unit.label}>{unit.abbrLabel}</abbr>
		</span>
	)
}
