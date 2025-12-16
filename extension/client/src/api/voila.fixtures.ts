import type { Voila } from '../types/voila/index';
export const decoratedProduct: Voila.DecoratedProduct = {
    productId: '',
    retailerProductId: '',
    type: '',
    name: '',
    brand: '',
    packSizeDescription: '',
    countryOfOrigin: '',
    seller: '',
    isNew: false,
    price: {
        amount: 0,
        currency: ''
    },
    grossPrice: 0,
    unitPrice: {
        price: {
            amount: 0,
            currency: ''
        },
        unit: '',
        pricePerSuffix: ''
    },
    referencePrice: 0,
    depositPrice: 0,
    additionalProductCharge: 0,
    promoPrice: {
        amount: 0,
        currency: ''
    },
    promoUnitPrice: {
        price: {
            amount: 0,
            currency: ''
        },
        unit: '',
        pricePerSuffix: ''
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
        availableResolutions: []
    },
    image: {
        src: '',
        description: '',
        fopSrcset: '',
        bopSrcset: '',
        imageId: ''
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
    deliveryTimeRestrictionMessage: '',
    checkoutTimeRestrictionMessage: ''
}

export const fetchPromotionPageResponse: Voila.FetchPromotionPageResponse = {
    productGroups: [
        {
            decoratedProducts: []
        }
    ],
    metadata: {

    }
}

export const fetchProductsResponse: Voila.FetchProductsResponse = {
    products: [],
    missedPromotions: [],
    restrictedGroups: {}
}
export const addToCartResponse: Voila.AddToCartResponse = {
    basketUpdateResult: {
        items: [],
        lastModified: '',
        totals: {
            itemsRetailPrice: {
                amount: '',
                currency: ''
            },
            itemPriceAfterPromos: {
                amount: '',
                currency: ''
            },
            savingsPrice: {
                amount: '',
                currency: ''
            },
            taxation: '',
            display: {
                itemPriceAfterPromos: {
                    amount: '',
                    currency: ''
                },
                taxation: ''
            },
            itemPriceAfterPromosDifference: {
                amount: '',
                currency: ''
            }
        },
        itemGroups: []
    },
    unavailableData: [],
    pricingNotifications: [],
    limitedItems: [],
    limitedPromotionIds: []
}