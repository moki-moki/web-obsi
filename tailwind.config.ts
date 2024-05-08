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
      white: "var(--white)",
      black: "var(--black)",
      border: "var(--border)",
      gray: "var(--gray)",
      "light-gray": "var(--light-gray",
      "dark-gray": "var(--dark-gray)",
      "dark-gray-accent": "var(--dark-gray-accent)",
      purple: "var(--purple)",
      emerald: "var(--emerald)",
    },
  },
  plugins: [],
};
export default config;
