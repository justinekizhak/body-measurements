import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        display: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [require("windicss/plugin/forms")],
});
