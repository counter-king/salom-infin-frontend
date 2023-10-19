/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      regular: ["SFProDisplay-Regular"],
      medium: ["SFProDisplay-Medium"],
      semibold: ["SFProDisplay-Semibold"],
      bold: ["SFProDisplay-Bold"],
    },
    extend: {},
  },
  plugins: [],
}
