import { supabaseRequest } from "@src/api/supabase"
import { Recipe } from "@src/types"
import { useQuery } from "@tanstack/react-query"
import Select from "antd/es/select"
import { useRef } from "react"

export function RecipeSourcePicker({
	onChange,
}: {
	onChange: (sources: Recipe.Source["source"][]) => void
}) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const { data } = useQuery<Recipe.Source[]>({
		queryKey: ["recipe-sources"],
		queryFn: async () => {
			const resp = await supabaseRequest({
				table: "recipe_sources",
				tableParams: {},
			})

			return resp.json()
		},
	})
	return (
		<div ref={wrapperRef}>
			<Select
				getPopupContainer={() =>
					wrapperRef.current ?? document.body
				}
				onChange={(vals) => onChange(vals)}
				options={
					data?.map((s) => ({
						value: s.source,
						label: `${s.source} (${s.recipe_count})`,
					})) ?? []
				}
				mode="multiple"
				placeholder="Recipe Source(s)"
				style={{
					width: "100%",
				}}
			/>
		</div>
	)
}
