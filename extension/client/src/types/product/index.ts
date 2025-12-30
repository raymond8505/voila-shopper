export namespace Product {
	/**
	 * A product containing all the relevant information
	 * needed to identify and describe it
	 */
	export interface SourceProduct {
		brand?: string
		name: string
		productType?: string
		variants?: string[]
		category?: string
		packSizeDescription?: string
		quantity?: number
		source: string
		sourceId: string
		price: number
		currency: string
		//rawData: Record<string, unknown>
	}
}
