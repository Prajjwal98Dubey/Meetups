/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "serif"],
        dancing: ["Dancing Script", "serif"],
      },
    },
  },
  plugins: [],
};
