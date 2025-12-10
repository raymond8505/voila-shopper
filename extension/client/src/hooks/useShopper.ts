import { useCallback, useState } from "react"
import { useVoila } from "./useVoila"
import { useJobManager } from "./useJobManager"
import type {
	RecommendationsWorkflowPayload,
	ShopperJob,
	TrimmedProduct,
	Voila,
	Workflow,
} from "../types/index"
import { useWorkflow } from "./useWorkflow"
import { getMinimalPrice } from "../helpers"
import { useStore } from "../store"
import { isWorkflowError } from "../types/helpers"

export function useShopper() {
	const { getProducts, getPromotionProducts } = useVoila()
	const { includeCriteria, excludeCriteria } = useStore()

	return {
		getRecommendations,
		generateRecommendations,
		recommendationsLoading: promosLoading || recommendationsLoading,
	}
}
