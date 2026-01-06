import TextArea from "antd/es/input/TextArea"
import { useStore as useClientStore } from "@store/client"
import { useStore as useProductStore } from "@store/products"
import Switch from "antd/es/switch"
import { css } from "@emotion/react"
import { supabaseRequest } from "@src/api/supabase"
import { useEffect, useRef } from "react"
import { Select } from "antd"

export function SettingsPanel() {
	const {
		includeCriteria,
		setIncludeCriteria,
		excludeCriteria,
		setExcludeCriteria,
		workflowLiveMode,
		setWorkflowLiveMode,
	} = useClientStore()

	const {
		setAllVariants,
		allVariants,
		setIgnoredVariants,
		ignoredVariants,
	} = useProductStore()

	useEffect(() => {
		supabaseRequest({
			table: "rpc/get_all_variants",
			tableParams: {},
		}).then(async (resp) => {
			const rawVariants: string[] = (await resp.json()).map(
				(v) => v.variant
			)

			setAllVariants(rawVariants)
		})
	}, [setAllVariants])

	const variantSelectRef = useRef<HTMLDivElement>(null)

	console.log({ ignoredVariants })

	return (
		<div>
			<fieldset>
				<legend>Ignore Variants</legend>
				<div ref={variantSelectRef}>
					<Select
						onChange={setIgnoredVariants}
						mode="multiple"
						placeholder="Variants to ignore"
						style={{
							width: "100%",
						}}
						options={allVariants?.map((v) => {
							{
								return {
									value: v,
									label: v,
								}
							}
						})}
						getPopupContainer={() =>
							variantSelectRef.current ?? document.body
						}
						value={ignoredVariants}
					></Select>
				</div>
			</fieldset>
			<fieldset>
				<legend>Always Look For</legend>
				<TextArea
					value={includeCriteria}
					onChange={(e) => setIncludeCriteria(e.target.value)}
					rows={5}
					placeholder="Always look for these things... eg: Bacon, Fat-Free, Keto-Friendly"
				></TextArea>
			</fieldset>
			<fieldset>
				<legend>Always Ignore</legend>
				<TextArea
					value={excludeCriteria}
					onChange={(e) => setExcludeCriteria(e.target.value)}
					rows={5}
					placeholder="Always ignore these things... eg: Frozen dinners, nuts, high carb"
				></TextArea>
			</fieldset>
			<fieldset>
				<legend>Workflow Settings</legend>

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
			</fieldset>
		</div>
	)
}
