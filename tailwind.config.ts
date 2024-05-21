import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      screens: {
        'xs': '375px',
        'sm': '680px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
    extend: {
      container: {
        padding: '2rem'
      },
      colors: {
        card: "#e5e5e5",
        card_darker: "#cecece",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },

  },
  plugins: [],
} satisfies Config;
