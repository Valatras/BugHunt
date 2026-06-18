import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
  server: {
    host: "0.0.0.0",
    port: 3001,
    cors: {
      origin: [
        "http://localhost:8081",
        "http://127.0.0.1:8081",
        "http://100.111.244.51:8081",
        "http://100.111.244.51:3001",
        
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
});
