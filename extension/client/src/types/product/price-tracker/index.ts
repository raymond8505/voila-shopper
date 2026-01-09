import { Product } from ".."

export namespace PriceTracker {
	export interface Rule {
		query: string
		priceType: "package" | "unit"
		priceComparison: "<=" | "<" | ">=" | ">"
		price: number | null // null = no price constraint, just semantic match
		isSale: boolean | null // null = any, true = on sale only, false = regular only
		limit?: number // default 3
		sourceBaseUrl?: string | null // reserved for future use
		enabled?: boolean
		matches?: Product.WithPriceIntelligence[]
	}
	export interface RuleWithEmbedding extends Rule {
		embedding: string
	}
	export interface CreateRuleResponse<ProductsType> {
		products: ProductsType[]
		rule: RuleWithEmbedding
		queryVector: string
	}
}
