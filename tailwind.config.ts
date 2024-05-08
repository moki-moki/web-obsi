import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: "#FFFCF9",
      black: "#070707",
      border: "#313131",
      "dark-gray": "#151515",
      "dark-gray-accent": "#212121",
      gray: "#666666",
      purple: "#603CE0",
      emerald: "#0CCE6B",
      "light-gray": "#eaeaea",
    },
  },
  plugins: [],
};
export default config;
