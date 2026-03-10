import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // optional global CSS config
  },
  tailwindcss: {
    theme: {
      extend: {
        fontFamily: {
          inter: ["Inter", "sans-serif"],
          jakarta: ["Plus Jakarta Sans", "sans-serif"],
        },
        fontSize: {
          "xxs": "0.65rem",
        },
      },
    },
  },
})