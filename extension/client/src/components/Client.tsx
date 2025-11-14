import { css } from "@emotion/react"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { Scraper } from "./Scraper"
export function Client() {
	const onChange = (key: string) => {
		console.log(key)
	}

	const items: TabsProps["items"] = [
		{
			key: "items",
			label: "Items",
			children: "Content of Tab Pane 1",
		},
		{
			key: "scraper",
			label: "Scraper",
			children: <Scraper />,
		},
	]
	return (
		<div
			css={css`
				width: 25vw;
				height: 100vh;
				min-width: 360px;
				position: fixed;
				top: 0;
				right: 0;
				background-color: white;
				box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
				padding: 8px;
				z-index: 999999999;
			`}
		>
			<Tabs defaultActiveKey="scraper" onChange={onChange} items={items} />
		</div>
	)
}
