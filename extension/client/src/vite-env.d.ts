/// <reference types="vite/client" />

import { Voila } from "./types"

declare global {
	interface Window {
		dataLayer?: {
			push?: (...args: any[]) => any
			[key: string]: any
		}
		__INITIAL_STATE__?: Voila.InitialState
		IS_STORYBOOK?: boolean
	}
}
