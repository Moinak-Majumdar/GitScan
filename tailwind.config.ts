import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shift: {
          '0%, 25%': { 'background-position': '0%, 50%' },
          '50%, 75%': { 'background-position': '50%, 100%' },
          '100': { 'background-position': '100%, 0%' },
        }
      },
      animation : {
        shift: 'shift 5s linear infinite'
      }
    }
  },
  plugins: [],
  darkMode: "class"
};
export default config;
