import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cockpit: {
          bg: "#080808",
          panel: "#14110d",
          sub: "#0d0b08",
          key: "#e8d27a",
          pressed: "#b8a24f",
          line: "#8a7a4a",
          crt: "#02060a",
          cyan: "#3fc1e0",
          green: "#6fbf73",
          red: "#d63a2f",
        },
        // legacy aliases kept so older page modules still resolve
        net: {
          bg: "#080808",
          panel: "#14110d",
          line: "#8a7a4a",
          ink: "#e8d27a",
          gray: "#8a7a4a",
          paper: "#e8d27a",
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
};
