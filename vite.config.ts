import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // ✅ allows LAN access (192.168.x.x)
    port: 8080,
  },
  preview: {
    host: "0.0.0.0", // ✅ same for preview build
    port: 4173,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  // ✅ SPA Fallback: ensures React Router works on refresh
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  }
}));
