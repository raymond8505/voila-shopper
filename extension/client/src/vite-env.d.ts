/// <reference types="vite/client" />

import { Voila } from "./types"

declare global {
	interface Window {
		dataLayer?: {
			push?: (...args: any[]) => any
			[key: string]: any
		}
		__INITIAL_STATE__?: Voila.InitialState
	}
}

interface ImportMetaEnv {
	readonly VITE_SUPABASE_API_KEY: string
	readonly VITE_SUPABASE_URL: string
	readonly VITE_WORKFLOW_RECOMMEND_PRODUCTS: string
	readonly VITE_WORKFLOW_RECOMMEND_RECIPES: string
	readonly VITE_RECOMMEND_PRODUCTS_BATCH_SIZE: number
	readonly VITE_WORKFLOW_USERNAME: string
	readonly VITE_WORKFLOW_PWD: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
