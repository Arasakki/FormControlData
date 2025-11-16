import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/FormControlData/",
  plugins: [react()],
  server: { host: true, port: 3000 },
});
