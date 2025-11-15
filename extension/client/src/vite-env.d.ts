/// <reference types="vite/client" />
declare global {
	interface Window {
		dataLayer?: {
			push?: (...args: any[]) => any
			[key: string]: any
		}
	}
}
