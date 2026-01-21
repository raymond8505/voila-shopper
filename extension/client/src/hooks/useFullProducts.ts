import { useStore as useProductStore } from "@store/products"
export function useFullProducts() {
	const { products } = useProductStore()
}
