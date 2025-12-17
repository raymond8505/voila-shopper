import type { Voila } from "../types/voila/index"
export const decoratedProduct: Voila.DecoratedProduct = {
	productId: "",
	retailerProductId: "",
	type: "",
	name: "",
	brand: "",
	packSizeDescription: "",
	countryOfOrigin: "",
	seller: "",
	isNew: false,
	price: {
		amount: 0,
		currency: "",
	},
	grossPrice: 0,
	unitPrice: {
		price: {
			amount: 0,
			currency: "",
		},
		unit: "",
		pricePerSuffix: "",
	},
	referencePrice: 0,
	depositPrice: 0,
	additionalProductCharge: 0,
	promoPrice: {
		amount: 0,
		currency: "",
	},
	promoUnitPrice: {
		price: {
			amount: 0,
			currency: "",
		},
		unit: "",
		pricePerSuffix: "",
	},
	promotions: [],
	unavailablePromotions: [],
	favorite: null,
	regular: null,
	available: false,
	isVerifiedPurchase: false,
	quantityInBasket: 0,
	maxQuantityReached: false,
	quantityRestrictionGroup: null,
	maxAvailableQuantity: 0,
	alternatives: [],
	isInShoppingList: false,
	isInCurrentCatalog: false,
	ratingSummary: null,
	restrictedVisibility: null,
	verifyMode: null,
	categoryPath: [],
	retailerFinancingPlanIds: [],
	hfssDisplayRestrictionGroup: null,
	medicalQuestionnaireRequired: null,
	taxCodesDisplayNames: [],
	imageConfig: {
		availableFormats: [],
		availableResolutions: [],
	},
	image: {
		src: "",
		description: "",
		fopSrcset: "",
		bopSrcset: "",
		imageId: "",
	},
	images: [],
	imageIds: [],
	imagePaths: [],
	iconAttributes: [],
	icons: [],
	basketLines: [],
	ageRestriction: null,
	alcohol: false,
	catchweight: null,
	guaranteedProductLife: null,
	temperatureRegime: null,
	timeRestriction: null,
	timeRestricted: false,
	checkoutTimeRestriction: null,
	checkoutTimeRestricted: null,
	deliveryTimeRestrictionMessage: "",
	checkoutTimeRestrictionMessage: "",
}

export const fetchPromotionPageResponse: Voila.FetchPromotionPageResponse = {
	productGroups: [
		{
			decoratedProducts: [],
		},
	],
	metadata: {},
}

export const fetchProductsResponse: Voila.FetchProductsResponse = {
	products: [],
	missedPromotions: [],
	restrictedGroups: {},
}
export const addToCartResponse: Voila.AddToCartResponse = {
	basketUpdateResult: {
		items: [],
		lastModified: "",
		totals: {
			itemsRetailPrice: {
				amount: "",
				currency: "",
			},
			itemPriceAfterPromos: {
				amount: "",
				currency: "",
			},
			savingsPrice: {
				amount: "",
				currency: "",
			},
			taxation: "",
			display: {
				itemPriceAfterPromos: {
					amount: "",
					currency: "",
				},
				taxation: "",
			},
			itemPriceAfterPromosDifference: {
				amount: "",
				currency: "",
			},
		},
		itemGroups: [],
	},
	unavailableData: [],
	pricingNotifications: [],
	limitedItems: [],
	limitedPromotionIds: [],
}

export const product: Voila.Product = {
	productId: "123456789",
	retailerProductId: "R123456789",
	type: "GROCERY",
	name: "Organic Whole Milk",
	brand: "Happy Cow",
	packSizeDescription: "1L",
	price: {
		amount: "3.50",
		currency: "CAD",
	},
	unitPrice: {
		price: {
			amount: "0.35",
			currency: "CAD",
		},
		unit: "100ml",
	},
	available: true,
	isVerifiedPurchase: false,
	quantityInBasket: 0,
	maxQuantityReached: false,
	promotions: [
		{
			promoId: "PROMO1",
			retailerPromotionId: "RPROMO1",
			description: "2 for $6.00",
			type: "MULTIBUY",
			presentationMode: "REGULAR",
			limitReached: false,
		},
	],
	taxCodesDisplayNames: ["HST"],
	promoPrice: {
		amount: "3.00",
		currency: "CAD",
	},
	promoUnitPrice: {
		price: {
			amount: "0.3",
			currency: "CAD",
		},
		unit: "l00ml",
	},
	imageConfig: {
		availableFormats: ["webp", "jpeg"],
		availableResolutions: ["100", "200", "400"],
	},
	image: {
		src: "/images/123456789.webp",
		description: "A carton of Happy Cow Organic Whole Milk",
		fopSrcset: "/images/123456789-fop.webp",
		bopSrcset: "/images/123456789-bop.webp",
		imageId: "IMG123",
	},
	images: [
		{
			src: "/images/123456789.webp",
			description: "A carton of Happy Cow Organic Whole Milk",
			fopSrcset: "/images/123456789-fop.webp",
			bopSrcset: "/images/123456789-bop.webp",
			imageId: "IMG123",
		},
	],
	imageIds: ["IMG123"],
	imagePaths: ["/images/123456789.webp"],
	iconAttributes: [
		{
			label: "Organic",
			file: "organic-icon.svg",
		},
	],
	icons: [],
	basketLines: [],
	timeRestricted: false,
	alternatives: [],
	isInShoppingList: false,
	isInCurrentCatalog: true,
	retailerFinancingPlanIds: [],
	alcohol: false,
	categoryPath: ["Dairy & Eggs", "Milk", "Organic Milk"],
	isNew: false,
}
