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

	export interface WithPrices extends BaseProduct {
		prices: Price[]
	}

	// Convenience alias for the full product shape
	export type Full = WithPrices

	export type StoreProduct = {
		raw?: RawProduct
		full?: Full
	}
}
