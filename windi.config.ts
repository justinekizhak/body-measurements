import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [require("windicss/plugin/forms")],
});
