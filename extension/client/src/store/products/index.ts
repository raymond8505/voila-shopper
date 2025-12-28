import { Product } from "@src/types/product"
import { create } from "zustand"

export interface ProductsStore {
	products: Product.Product[]
	addProducts: (products: Product.Product[]) => void
	removeProducts: (products: Product.Product[]) => void
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
