import { Product } from "@src/types/product"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import {
	getLocalStorageStore,
	setLocalStorageStore,
} from "../helpers"
import { PriceTracker } from "@src/types/product/price-tracker"
export interface ProductsStore {
	products: Product.StoreProduct[]
	addProducts: (products: Product.StoreProduct[]) => void
	removeProducts: (products: Product.StoreProduct[]) => void
	allVariants: string[]
	setAllVariants: (variants: string[]) => void
	ignoredVariants: string[]
	setIgnoredVariants: (variants: string[]) => void
	priceTrackerRules: PriceTracker.RuleWithEmbedding[]
	setPriceTrackerRules: (
		rules: PriceTracker.RuleWithEmbedding[]
	) => void
}
const localStorageStore = getLocalStorageStore()
console.log(localStorageStore.products)
export const useStore = create<ProductsStore>()(
	subscribeWithSelector((set) => ({
		allVariants: [],
		setAllVariants: (variants) => set({ allVariants: variants }),
		ignoredVariants:
			localStorageStore.products?.ignoredVariants ?? [],
		setIgnoredVariants: (variants) =>
			set({ ignoredVariants: variants }),
		products: [],
		addProducts: (products) =>
			set((state) => ({
				products: [...state.products, ...products].filter(
					(p, index, self) => {
						return (
							index ===
							self.findIndex((t) => t.full?.id === p.full?.id)
						)
					}
				),
			})),
		removeProducts: (products) =>
			set((state) => ({
				products: state.products.filter(
					(product) => !products.includes(product)
				),
			})),
		priceTrackerRules:
			localStorageStore.products?.priceTrackerRules ?? [],
		setPriceTrackerRules: (rules) =>
			set({
				priceTrackerRules: rules,
			}),
	}))
)

useStore.subscribe(
	(state) => ({
		ignoredVariants: state.ignoredVariants,
		priceTrackerRules: state.priceTrackerRules.map((r) => ({
			...r,
			matches: undefined,
		})),
	}),
	(state) => setLocalStorageStore(state, "products")
)
