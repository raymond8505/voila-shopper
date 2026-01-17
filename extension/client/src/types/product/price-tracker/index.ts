import { ProductView } from "../product-view"

export namespace PriceTracker {
	export interface Rule {
		id: string
		query: string
		priceType: "package" | "unit"
		priceComparison: "<=" | "<" | ">=" | ">"
		price: number | null // null = no price constraint, just semantic match
		isSale: boolean | null // null = any, true = on sale only, false = regular only
		limit?: number // default 3
		sourceBaseUrl?: string | null // reserved for future use
		enabled?: boolean
		matches?: PriceRuleMatch[]
	}
	export interface RuleWithEmbedding extends Rule {
		embedding: string
	}
	export interface CreateRuleResponse {
		products: PriceRuleMatch[]
		rule: RuleWithEmbedding
		queryVector: string
	}
	export interface PriceRuleMatch {
		product_view: ProductView.ProductView
		similarity: number
	}
}
