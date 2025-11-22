import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import dotenv from "dotenv";

// Load .env for vite config so we can proxy to correct backend port in development
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: (() => {
      // Prefer PORT (server's PORT) first, then BACKEND_PORT, then default 5000
      const backendPort = process.env.PORT || process.env.BACKEND_PORT || "5000";
      const target = `http://localhost:${backendPort}`;
      return {
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      };
    })(),
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
