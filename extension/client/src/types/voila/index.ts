export namespace Voila {
	export type Price = {
		currency: string
		amount: string
	}

	export type ItemTotalPrices = {
		regularPrice: Price
		finalPrice: Price
		finalUnitPrice: Price
	}

	export type BasketLine = {
		appliedPromoIds: string[]
	}

	export type BasketItem = {
		productId: string
		promoVersionId: string
		quantity: number
		lastModified: string
		maxQuantityReached: boolean
		price: Price
		regularPrice: Price
		totalPrices: ItemTotalPrices
		basketLines: BasketLine[]
	}

	export type TotalsDisplay = {
		itemPriceAfterPromos: Price
		taxation: string
	}

	export type BasketTotals = {
		itemsRetailPrice: Price
		itemPriceAfterPromos: Price
		savingsPrice: Price
		taxation: string
		display: TotalsDisplay
		itemPriceAfterPromosDifference: Price
	}

	export type ItemGroup = {
		groupName: string
		items: string[]
	}

	export type BasketUpdateResult = {
		items: BasketItem[]
		lastModified: string
		totals: BasketTotals
		itemGroups: ItemGroup[]
	}

	export type AddToCartResponse = {
		basketUpdateResult: BasketUpdateResult
		unavailableData: unknown[]
		pricingNotifications: unknown[]
		limitedItems: unknown[]
		limitedPromotionIds: unknown[]
	}
	export interface InitialState {
		session: {
			csrf: {
				token: string
			}
			features: {
				enabledFeatures: string[]
			}
			metadata: {
				visitorId: string
				customerId: string
				sessionId: string
				contentExperienceUserId: string
				requestId: string
				serverLoadTime: number
				isServerRendered: boolean
				locationChangeCount: number
				isFullPageLoad: boolean
				hasPageBeenHidden: boolean
				assetVersion: string
				bannerId: string
				retailerBannerId: string
				bannerName: string
				bannerBusinessModel: string
				fqdn: string
				regionId: string
				retailerRegionId: string
				regionName: string
				environment: string
				reportingLevel: number
				isFetching: boolean
				fetchError: boolean
				retailerCustomerId: string
			}
			additionalDetails: {
				isFetching: boolean
				fetchError: boolean
				didInvalidate: boolean
				lastUpdated: null | string // Assuming null or string for date/timestamp
				required: boolean
			}
			isSuperuser: boolean
			isLoggedIn: boolean
			ageConfirmed: boolean
			linkTypeDetector: {
				type: "ALL_SPA_LINKS"
			}
			customerSession: {
				isFetching: boolean
				fetchError: boolean
				didInvalidate: boolean
				lastUpdated: null | string // Assuming null or string for date/timestamp
				data: null | Record<string, unknown> // Placeholder for potential data structure
				error: null | Record<string, unknown> // Placeholder for potential error structure
			}
		}
	}
	export interface Product {
		productId: string
		retailerProductId: string
		type: string
		name: string
		brand: string
		packSizeDescription: string
		price: {
			amount: string
			currency: string
		}
		unitPrice: {
			price: {
				amount: string
				currency: string
			}
			unit: string
		}
		available: boolean
		isVerifiedPurchase: boolean
		quantityInBasket: number
		maxQuantityReached: boolean
		promotions: {
			promoId: string
			retailerPromotionId: string
			description: string
			type: string
			presentationMode: string
			limitReached: boolean
		}[]
		taxCodesDisplayNames: string[]
		promoPrice?: {
			amount: string
			currency: string
		}
		promoUnitPrice?: {
			price: {
				amount: string
				currency: string
			}
			unit: string
		}
		imageConfig: {
			availableFormats: string[]
			availableResolutions: string[]
		}
		image: {
			src: string
			description: string
			fopSrcset: string
			bopSrcset: string
			imageId: string
		}
		images: {
			src: string
			description: string
			fopSrcset: string
			bopSrcset: string
			imageId: string
		}[]
		imageIds: string[]
		imagePaths: string[]
		iconAttributes: {
			label: string
			file: string
		}[]
		icons: any[]
		basketLines: any[]
		timeRestricted: boolean
		alternatives: any[]
		isInShoppingList: boolean
		isInCurrentCatalog: boolean
		retailerFinancingPlanIds: any[]
		alcohol: boolean
		categoryPath: string[]
		isNew: boolean
	}

	export interface FetchPromotionPageResponse {
		productGroups: {
			decoratedProducts: DecoratedProduct[]
		}[]
		metadata: {
			nextPageToken?: string
		}
	}

	export interface DecoratedProduct {
		productId: string
		retailerProductId: string
		type: string
		name: string
		brand: string | null
		packSizeDescription: string | null
		countryOfOrigin: string | null
		seller: string | null
		isNew: boolean
		price: {
			amount: number
			currency: string
		}
		grossPrice: number | null
		unitPrice: {
			price: {
				amount: number
				currency: string
			}
			unit: string
			pricePerSuffix: string | null
		}
		referencePrice: number | null
		depositPrice: number | null
		additionalProductCharge: number | null
		promoPrice: {
			amount: number
			currency: string
		} | null
		promoUnitPrice: {
			price: {
				amount: number
				currency: string
			}
			unit: string
			pricePerSuffix: string | null
		} | null
		promotions: Array<{
			promoId: string
			retailerPromotionId: string
			description: string
			type: string
			presentationMode: string
			requiredProductQuantity: number | null
		}>
		unavailablePromotions: any | null
		favorite: any | null
		regular: any | null
		available: boolean
		isVerifiedPurchase: boolean
		quantityInBasket: number
		maxQuantityReached: boolean
		quantityRestrictionGroup: any | null
		maxAvailableQuantity: number | null
		alternatives: any[]
		isInShoppingList: boolean
		isInCurrentCatalog: boolean
		ratingSummary: any | null
		restrictedVisibility: any | null
		verifyMode: any | null
		categoryPath: string[]
		retailerFinancingPlanIds: any[]
		hfssDisplayRestrictionGroup: any | null
		medicalQuestionnaireRequired: any | null
		taxCodesDisplayNames: any[]
		imageConfig: {
			availableFormats: string[]
			availableResolutions: string[]
		}
		image: {
			src: string
			description: string
			fopSrcset: string
			bopSrcset: string
			imageId: string
		}
		images: Array<{
			src: string
			description: string
			fopSrcset: string
			bopSrcset: string
			imageId: string
		}>
		imageIds: string[]
		imagePaths: string[]
		iconAttributes: any[]
		icons: any[]
		basketLines: any[]
		ageRestriction: any | null
		alcohol: boolean
		catchweight: any | null
		guaranteedProductLife: any | null
		temperatureRegime: any | null
		timeRestriction: any | null
		timeRestricted: boolean
		checkoutTimeRestriction: any | null
		checkoutTimeRestricted: any | null
		deliveryTimeRestrictionMessage: string | null
		checkoutTimeRestrictionMessage: string | null
	}

	export type ProductImpression = Pick<
		Voila.Product,
		"productId" | "name" | "brand" | "price"
	> & {
		id: string
		category: string
		variant: string
		quantity: number
		isFeatured: boolean
		isFavorite: boolean
		canAddToBasket: boolean
		promotionIds: string[]
		promotionNames: string[]
		position: number
		isOnPromotion: boolean
		isPersonalised: boolean
		list: string
	}

	export interface ViewItemListEvent {
		eventAction: "view_item_list"
		ecommerce?: {
			impressions?: ProductImpression[]
		}
	}

	export interface FetchProductsResponse {
		products: Product[]
		missedPromotions: unknown[]
		restrictedGroups: Record<string, unknown>
	}
}
