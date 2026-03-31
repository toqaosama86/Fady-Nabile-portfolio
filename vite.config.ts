import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core dependencies
          "vendor": ["react", "react-dom", "react-router-dom"],
          "query": ["@tanstack/react-query"],
          "supabase": ["@supabase/supabase-js"],
          "animation": ["framer-motion"],
          "utils": ["clsx", "class-variance-authority", "date-fns", "zod"],
        },
      },
    },
  },
}));
