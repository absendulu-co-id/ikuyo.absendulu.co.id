import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host:true,
    port:8000,
    watch: {
    usePolling: true
    }
  }

});
