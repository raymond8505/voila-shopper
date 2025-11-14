import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { watch } from "fs";

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
        watcher: resolve(__dirname, "watcher/index.ts"),
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name === "client") return "client.js";
          if (chunk.name === "watcher") return "watcher.js";
          return "[name].js";
        }
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
