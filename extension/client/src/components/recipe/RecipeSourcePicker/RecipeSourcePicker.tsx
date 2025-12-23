import { supabaseRequest } from "@src/api/supabase"
import { Recipe } from "@src/types"
import { useQuery } from "@tanstack/react-query"
import Select from "antd/es/select"

export function RecipeSourcePicker({
	onChange,
}: {
	onChange: (sources: Recipe.Source["source"][]) => void
}) {
	const { data } = useQuery<Recipe.Source[]>({
		queryKey: ["recipe-sources"],
		queryFn: async () => {
			const resp = await supabaseRequest({
				table: "recipes_embedding_sources",
				tableParams: {
					order: "source.asc",
					select: "*",
				},
			})

			return resp.json()
		},
	})
	return (
		<Select
			onChange={(vals) => onChange(vals)}
			options={
				data?.map((s) => ({
					value: s.source,
					label: `${s.source} (${s.count})`,
				})) ?? []
			}
			mode="multiple"
			placeholder="Recipe Source(s)"
			style={{
				width: "calc(18 * .75em)",
			}}
		/>
	)
}
