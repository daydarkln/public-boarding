import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [react(), TsconfigPaths()],
    logLevel: "info",
    server: {
      port: 3000,
      proxy: {
        "/api/telegram-bot-strapi": {
          target: "http://localhost:1337",
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/api": {
          target: "http://localhost:1337/",
        },
      },
    },
  };
});
