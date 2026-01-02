import { Voila } from "../../types/voila/index"

// GA4 view_item_list event
export type GA4ViewItemListEvent = {
	event: "view_item_list"
	ecommerce: {
		items: unknown[]
	} & Record<string, unknown>
	"gtm.uniqueEventId": number
}

export interface EnhancedEcommerceEvent {
	ecommType: "enhanced"
	event: "event"
	eventCategory: string
	eventAction: string
	eventLabel: string
	ecommerce: {
		impressions: Partial<Voila.Product>[]
		currencyCode: string
	}
	"gtm.uniqueEventId": number
}

/**
 * Voila uses GA3 and GA4 for tracking. This type guard checks
 * if the event is a GA3 enhanced ecommerce impression event.
 *
 * The GA4 events don't carry the product details we need.
 * @todo Figure out how to handle GA4 events properly
 */
export function isGA3ImpressionEvent(
	event: GA4ViewItemListEvent | EnhancedEcommerceEvent
): event is EnhancedEcommerceEvent {
	return (
		event &&
		Object.hasOwn(event, "eventAction") &&
		event["eventAction"] === "view_item_list" &&
		event.ecommerce &&
		Object.hasOwn(event.ecommerce, "impressions")
	)
}
