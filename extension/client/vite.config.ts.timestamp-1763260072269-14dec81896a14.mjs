// vite.config.ts
import { defineConfig } from "file:///C:/Users/crazy/OneDrive/Desktop/projects/voila-shopper/extension/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/crazy/OneDrive/Desktop/projects/voila-shopper/extension/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\crazy\\OneDrive\\Desktop\\projects\\voila-shopper\\extension\\client";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        client: resolve(__vite_injected_original_dirname, "src/main.tsx")
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "client")
            return "client.js";
          return "[name].js";
        }
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjcmF6eVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXHZvaWxhLXNob3BwZXJcXFxcZXh0ZW5zaW9uXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY3JhenlcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFx2b2lsYS1zaG9wcGVyXFxcXGV4dGVuc2lvblxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2NyYXp5L09uZURyaXZlL0Rlc2t0b3AvcHJvamVjdHMvdm9pbGEtc2hvcHBlci9leHRlbnNpb24vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgd2F0Y2ggfSBmcm9tIFwiZnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIuL1wiLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAganN4SW1wb3J0U291cmNlOiBcIkBlbW90aW9uL3JlYWN0XCIsXG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbXCJAZW1vdGlvbi9iYWJlbC1wbHVnaW5cIl0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgY2xpZW50OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvbWFpbi50c3hcIiksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBjaHVuayA9PiB7XG4gICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IFwiY2xpZW50XCIpIHJldHVybiBcImNsaWVudC5qc1wiO1xuXG4gICAgICAgICAgcmV0dXJuIFwiW25hbWVdLmpzXCI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WixTQUFTLG9CQUFvQjtBQUN0YixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBRnhCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyx1QkFBdUI7QUFBQSxNQUNuQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNELE9BQU87QUFBQSxJQUNKLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLFFBQVEsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDM0M7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixXQUFTO0FBQ3ZCLGNBQUksTUFBTSxTQUFTO0FBQVUsbUJBQU87QUFFcEMsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
