export function supabaseRequest({
	table,
	tableParams,
	opts,
}: {
	table: string
	tableParams: Record<string, string | number>
	opts?: RequestInit
}) {
	const url = new URL(
		`${import.meta.env.VITE_SUPABASE_URL}${table}`
	)

	tableParams &&
		Object.entries(tableParams).forEach(([key, value]) => {
			url.searchParams.append(key, String(value))
		})

	return fetch(url.toString(), {
		headers: {
			apikey: import.meta.env.VITE_SUPABASE_API_KEY,
			Authorization: `Bearer ${
				import.meta.env.VITE_SUPABASE_API_KEY
			}`,
			"Content-Type": "application/json",
			...opts?.headers,
		},
		...opts,
	})
}
