import { useEffect } from "react"

export function Scraper() {
	function onViewItemList(items) {
		console.log("view_item_list event detected:", items)
	}
	useEffect(() => {
		window.addEventListener("datalayerpush", (event: any) => {
			if (event.detail.eventAction === "view_item_list") {
				onViewItemList(event.detail.ecommerce.impressions)
			}
		})
	}, [])

	return <div>Scraper Component</div>
}
