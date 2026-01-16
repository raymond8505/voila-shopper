export namespace ProductView {
	export interface ProductView {
		product: Product
		latest_prices: LatestPrice[]
		best_current_price: BestCurrentPrice
		price_stats: PriceStats
		commodity_stats: CommodityStats
		rank: ProductRank
		verdict: PriceVerdict
	}

	export interface Product {
		id: string
		brand: string | null
		name: string
		raw_name: string | null
		raw_category: string | null
		product_type: string
		variants: string[] | null
		category: string | null
		quantity: number
		size_value: number | null
		size_unit: string | null
		size_display: string | null
		gtin: string | null
		product_fingerprint: string
		commodity_fingerprint: string
		created_at: string
		updated_at: string
	}

	export interface LatestPrice {
		source_id: string
		source_name: string
		source_slug: string
		price: number
		original_price: number | null
		is_sale: boolean
		unit_price: number | null
		unit_price_unit: string | null
		observed_at: string
	}

	export interface BestCurrentPrice {
		price: number | null
		unit_price: number | null
		is_sale: boolean | null
		original_price: number | null
		source_name: string | null
		source_slug: string | null
		source_product_url?: string
	}

	export interface PriceStats {
		observation_count: number
		avg_price: number | null
		min_price: number | null
		max_price: number | null
		avg_regular_price: number | null
		avg_sale_price: number | null
		sale_count: number
		regular_count: number
		first_observed: string | null
		last_observed: string | null
		vs_avg_pct: number | null
		vs_regular_pct: number | null
	}

	export interface CommodityStats {
		product_count: number
		total_observations: number
		avg_unit_price: number | null
		min_unit_price: number | null
		max_unit_price: number | null
		avg_regular_unit_price: number | null
		avg_sale_unit_price: number | null
		best_deal: CommodityBestDeal
	}

	export interface CommodityBestDeal {
		product_id: string | null
		brand: string | null
		name: string | null
		price: number | null
		unit_price: number | null
		is_sale: boolean | null
		source: string | null
	}

	export interface ProductRank {
		rank: number | null
		total: number | null
		percentile: number | null
	}

	export interface PriceVerdict {
		is_good_product_price: boolean
		is_good_commodity_price: boolean
		is_best_in_commodity: boolean
		has_cheaper_alternatives: boolean
	}
}
