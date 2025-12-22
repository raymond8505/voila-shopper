import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_")
	return {
		base: "./",
		resolve: {
			alias: {
				"@src": resolve(__dirname, "src"),
			},
		},
		plugins: [
			react({
				jsxImportSource: "@emotion/react",
				babel: {
					plugins: ["@emotion/babel-plugin"],
				},
			}),
		],
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: "./src/vitest-setup.ts",
		},
		build: {
			rollupOptions: {
				input: {
					client: resolve(__dirname, "src/main.tsx"),
					dispatchInitialState: resolve(
						__dirname,
						"src/dispatchInitialState.ts"
					),
				},
				output: {
					entryFileNames: (chunk) => {
						if (chunk.name === "client") return "client.js"
						if (chunk.name === "dispatchInitialState")
							return "dispatchInitialState.js"

						return "[name].js"
					},
				},
			},
			outDir: "dist",
			emptyOutDir: true,
			sourcemap: true,
		},
		define: {
			"import.meta.env.VITE_SUPABASE_API_KEY": JSON.stringify(
				env.VITE_SUPABASE_API_KEY
			),
			"import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
				env.VITE_SUPABASE_URL
			),
			"import.meta.env.VITE_WORKFLOW_RECOMMEND_PRODUCTS":
				JSON.stringify(env.VITE_WORKFLOW_RECOMMEND_PRODUCTS),
		},
	}
})
