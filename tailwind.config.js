/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./public/pages/**/*.html",
    "./src/**/*.{ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}