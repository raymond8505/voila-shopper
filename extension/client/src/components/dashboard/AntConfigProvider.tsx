import { ConfigProvider } from "antd"
import { ReactNode } from "react"

export function AntConfigProvider({
	children,
}: {
	children: ReactNode
}) {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorHighlight: "#00d6ff",
					colorPrimaryActive: "#00d6ff",
					colorText: "#004740",
				},
				components: {
					Descriptions: {
						labelColor: "inherit",
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
