import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { watch } from "fs"

export default defineConfig({
	base: "./",
	plugins: [
		react({
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				client: resolve(__dirname, "src/main.tsx"),
				dispatchInitialState: resolve(__dirname, "src/dispatchInitialState.ts"),
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
})
