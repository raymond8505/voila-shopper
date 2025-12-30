import { Voila } from "@src/types"
import { Product } from "@src/types/product"
import { useStore as useProductsStore } from "@store/products"
import { useCallback, useEffect } from "react"
import { useVoila } from "./useVoila"
import { useWorkflow } from "./useWorkflow"

function normalizeVoilaProduct(
	rawProduct: Voila.Product
): Product.SourceProduct {
	return {
		brand: rawProduct.brand,
		name: rawProduct.name,
		category: rawProduct.categoryPath.join(" > "),
		packSizeDescription: rawProduct.packSizeDescription,
		source: "voila.ca",
		sourceId: rawProduct.productId,
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

	useEffect(() => {
		getProducts([
			"9e0f62a2-00d0-4b81-a845-f9f138ea1c06",
			"a9d932e8-3be0-4b90-9f76-fd0804c37205",
			"8fd871c8-f740-4fa0-b6eb-92e08bb7d045",
			"56226590-4e95-473c-a1f0-b3c6a910a1df",
			"e4de69cd-d19a-4618-b8e1-fef1041f79ed",
			"9dbe5bbc-18b4-418f-b057-3a4de6566f1c",
			"2afde4f6-501a-4e00-b0b1-a87e74545928",
			"67c82b85-388d-43e8-b9c9-5f49e5446d26",
			"f19ecc28-ca8e-4e60-a7d0-1b644bcfb949",
			"10d309c6-7014-4e9a-8aab-47e13fd17a73",
			"50773088-7f54-4c5f-bb8a-ee5aab0e49b3",
			"47c3fc64-ad44-4454-aa85-fe85486d0d5a",
			"5ee1c565-8424-4883-b61b-5a6f8abf9b8b",
			"7355b84f-b4b8-4b68-acd8-c5b6ef8d9908",
			"dc4949ad-e595-4d0f-a172-8035e0a5b171",
			"b3888703-1b54-4bf0-bfeb-0b37087d9bca",
			"742e4832-92a4-4d42-8326-a02c64affd2a",
			"1cb1c9f3-0543-4266-a991-d9a616c3bc0d",
			"a373a3d0-39fe-458a-bdfc-d99bffb11295",
			"1363feea-4977-455c-b8a7-626776f50e2e",
			"45d3d8a0-953f-49a5-a62f-5ae2118e3780",
			"035e8a3c-4ee8-49ca-beb4-73f6746f5f96",
			"f334df45-cb1f-4b93-a313-1b62a3d36f7d",
			"08fbd45a-03a6-4786-9b4e-71581e908282",
			"1a89c867-d584-4c90-be38-9c88f704922d",
		]).then((r) =>
			console.log(r.products.map(normalizeVoilaProduct))
		)
	}, [])

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
