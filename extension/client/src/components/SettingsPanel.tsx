import Divider from "antd/es/divider"
import TextArea from "antd/es/input/TextArea"
import { useStore } from "../store"

export function SettingsPanel() {
	const {
		includeCriteria,
		setIncludeCriteria,
		excludeCriteria,
		setExcludeCriteria,
	} = useStore()
	return (
		<div>
			<strong>Always Look For</strong>
			<TextArea
				value={includeCriteria}
				onChange={(e) => setIncludeCriteria(e.target.value)}
				rows={5}
				placeholder="Always look for these things... eg: Bacon, Fat-Free, Keto-Friendly"
			></TextArea>
			<Divider />
			<strong>Always Ignore</strong>
			<TextArea
				value={excludeCriteria}
				onChange={(e) => setExcludeCriteria(e.target.value)}
				rows={5}
				placeholder="Always ignore these things... eg: Frozen dinners, nuts, high carb"
			></TextArea>
		</div>
	)
}
