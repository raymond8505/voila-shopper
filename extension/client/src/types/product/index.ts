export namespace Product {
	/**
	 * A product containing all the relevant information
	 * needed to identify and describe it
	 */
	export interface RawProduct {
		brand?: string
		name: string
		productType?: string
		variants?: string[]
		category?: string
		packSizeDescription?: string
		quantity?: number
		source: string
		sourceId: string
		price: {
			price: number
			currency: string
			originalPrice?: number
		}
		currency: string
		url?: string
		//rawData: Record<string, unknown>
	}

	export interface Size {
		unit: string | null
		value: number | null
	}

	export interface Package {
		quantity: number
		size: Size
	}

	export interface Commodity {
		type: string
		variants: string[]
		fingerprint: string
	}

	export interface SourceProduct {
		name: string
		category: string | null
	}

	export interface Source {
		name: string
		slug: string
		product: RawProduct
	}

	export interface Price {
		price: number
		original_price: number | null
		currency: string
		source: Source
	}

	export interface SourcePrice {
		is_sale: boolean
		observed_at: string
		original_price: number | null
		price: number
		source_id: string
		source_name: string
		source_slug: string
		unit_price: number
		unit_price_unit: string
	}

	export interface PriceRuleMatch {}
	// ============================================================================
	// Price Intelligence Types
	// ============================================================================

	export interface CurrentPrice {
		price: number
		is_sale: boolean
		original_price: number | null
		source_name: string
		source_slug: string
		is_best_source: boolean
		external_id: string
	}

	export interface BestSource {
		source_id: string
		source_name: string
		source_slug: string
		price: number
	}

	export interface ProductHistory {
		product_id: string
		observation_count: number
		first_observed: string
		last_observed: string
		regular_count: number
		avg_regular_price: number | null
		lowest_regular_price: number | null
		sale_count: number
		avg_sale_price: number | null
		lowest_sale_price: number | null
		best_source: BestSource
	}

	export interface CommodityStats {
		commodity_fingerprint: string
		product_count: number
		observation_count: number
		regular_count: number
		avg_regular_price: number | null
		lowest_regular_price: number | null
		sale_count: number
		avg_sale_price: number | null
		lowest_sale_price: number | null
	}

	export interface PriceIntelligence {
		current: CurrentPrice
		product_history: ProductHistory
		commodity_stats: CommodityStats
	}

	// ============================================================================
	// Product Types
	// ============================================================================

	export interface BaseProduct {
		id: string
		gtin: string | null
		created_at: string
		updated_at: string
		fingerprint: string
		brand: string | null
		name: string
		category: string
		commodity: Commodity
		package: Package
	}

	export interface Metadata {
		raw_input: {
			product: RawProduct
		}
	}

	export interface WithPrices extends BaseProduct {
		prices: Price[]
	}

	export interface WithPriceIntelligence extends BaseProduct {
		price_intelligence: PriceIntelligence
	}

	// Convenience aliases
	export type Full = WithPrices

	export type StoreProduct = {
		raw: RawProduct
		full?: WithPriceIntelligence
	}
}
