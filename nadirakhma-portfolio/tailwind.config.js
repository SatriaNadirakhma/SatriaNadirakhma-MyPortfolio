import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Pastikan baris ini ada!
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],

        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
