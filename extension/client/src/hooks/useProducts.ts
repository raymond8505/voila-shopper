import { Voila } from "@src/types"
import { Product } from "@src/types/product"
import { useStore as useProductsStore } from "@store/products"
import { useCallback, useEffect } from "react"
import { useVoila } from "./useVoila"
import { useWorkflow } from "./useWorkflow"

function normalizeVoilaProduct(
	rawProduct: Voila.Product
): Product.SourceProduct {
	const rawPrice = rawProduct.promoPrice ?? rawProduct.price
	return {
		brand: rawProduct.brand,
		name: rawProduct.name,
		category: rawProduct.categoryPath.join(" > "),
		packSizeDescription: rawProduct.packSizeDescription,
		source: "voila.ca",
		sourceId: rawProduct.productId,
		price: Number(rawPrice.amount),
		currency: rawPrice.currency,
	}
}
export function useProducts() {
	const { addProducts, products } = useProductsStore()
	const { getProducts } = useVoila()
	const { call: createProducts } = useWorkflow({
		url: import.meta.env.VITE_WORKFLOW_CREATE_PRODUCTS,
		auth: {
			username: import.meta.env.VITE_WORKFLOW_USERNAME,
			password: import.meta.env.VITE_WORKFLOW_PWD,
		},
	})

	const hydrateProducts = useCallback(
		async (productsToHydrate: Partial<Voila.Product>[]) => {
			const newProducts = productsToHydrate.filter(
				(newProduct) =>
					!products.some(
						(existingProduct) =>
							existingProduct.name === newProduct.name
					)
			)

			const newVoilaProducts = await getProducts(
				newProducts.map((p) => p.productId as string)
			)

			const productsToCreate = newVoilaProducts.products.map(
				normalizeVoilaProduct
			)

			createProducts<{ products: Product.SourceProduct[] }>({
				payload: { products: productsToCreate },
				hookOptions: {
					method: "POST",
				},
				responseType: "hook",
			})
				.catch((error) => {
					console.error("Error creating products:", error)
				})
				.then((t) => {
					console.log("Created products workflow response:", t)
				})
		},
		[addProducts, products, getProducts]
	)

	return { hydrateProducts }
}
