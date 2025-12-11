import type { Voila } from "./voila"
import type { Job } from "./job"
import type { Workflow } from "./workflow"
import type { Recipe } from "./recipe"

export { Voila, Job, Workflow, Recipe }

export interface TypedResponse<T> extends Response {
	json(): Promise<T>
}

export type JobProduct = Pick<
	Voila.Product,
	| "productId"
	| "brand"
	| "categoryPath"
	| "name"
	| "price"
	| "promoPrice"
	| "promoUnitPrice"
	| "unitPrice"
>
export type ShopperJob = {
	products: Voila.Product["productId"][]
}

export type TrimmedProduct = Omit<Partial<Voila.Product>, "price"> & {
	price: MinimalPrice
}

export interface RecommendationsWorkflowPayload {
	products: TrimmedProduct[]
	includeCriteria: string
	excludeCriteria: string
}

export interface CategoryTree {
	[categoryName: string]: CategoryTree | Voila.Product[]
}

export interface MinimalPrice {
	currentPrice: number
	originalPrice: number
}
