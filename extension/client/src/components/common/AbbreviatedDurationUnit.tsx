import { ParsedISODurationUnit } from "../../helpers"

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
