import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#e5e5e5",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
            //Our fall animation keyframes              
            fall: {
                '0%': { transform: 'translate(0%,-150%) skewX(0deg)' },
                '50%': { transform: 'translate(0%,0%) skewX(-10deg)' },
                '100%': { transform: 'translate(0%,150%) skewX(0deg)' },
              },
            },
      
      animation: {
           // You can then reference these keyframes by name in the 
           // animation section of your theme configuration
           fall: 'fall 3s ease infinite',
           // animation shorthand CSS property i.e
           // animation-name | animation-duration | animation-timing-function 
           // animation-iteration-count
      }
    },

  },
  plugins: [],
} satisfies Config;
