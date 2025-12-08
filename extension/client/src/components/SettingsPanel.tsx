import Divider from "antd/es/divider"
import TextArea from "antd/es/input/TextArea"
import { useStore } from "../store"
import Switch from "antd/es/switch"
import { css } from "@emotion/react"

export function SettingsPanel() {
	const {
		includeCriteria,
		setIncludeCriteria,
		excludeCriteria,
		setExcludeCriteria,
		workflowLiveMode,
		setWorkflowLiveMode,
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
			<Divider />
			<div>
				<strong>Workflow Settings</strong>
			</div>
			<label>
				<Switch
					checkedChildren={"Live"}
					unCheckedChildren={"Test"}
					checked={workflowLiveMode}
					onChange={(checked) => setWorkflowLiveMode(checked)}
				/>
				<span
					css={css`
						margin-left: 8px;
					`}
				>
					n8n Workflow State
				</span>
			</label>
		</div>
	)
}
