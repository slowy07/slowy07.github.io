import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        net: {
          bg: "#080808",
          panel: "#111111",
          line: "#303030",
          ink: "#E8E8E0",
          gray: "#8A8A84",
          paper: "#F2F2EA",
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
};
