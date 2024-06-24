import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/hello": {
        target: "http://localhost:3000/hello",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hello/, ""),
        secure: false,
      },
      "/projects": {
        target: "http://localhost:3000/projects",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/projects/, ""),
        secure: false,
      },
    },
  },
});
