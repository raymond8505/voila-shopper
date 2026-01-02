import { Product } from "@src/types/product"
import { create } from "zustand"

export interface ProductsStore {
	products: Product.StoreProduct[]
	addProducts: (products: Product.StoreProduct[]) => void
	removeProducts: (products: Product.StoreProduct[]) => void
}

export const useStore = create<ProductsStore>()((set) => ({
	products: [],
	addProducts: (products) =>
		set((state) => ({
			products: [...state.products, ...products],
		})),
	removeProducts: (products) =>
		set((state) => ({
			products: state.products.filter(
				(product) => !products.includes(product)
			),
		})),
}))
