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
    extend: {
      colors: {
        "primary-dark": "#090F33",
        "gray-1": "#767994",
        "gray-2": "#757994",
        "gray-3": "#E2E8F0",
        "gray-4": "#ADB7C2",
      }
    },
  },
  plugins: [],
}
