/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eb: {
          bg: "#141b1e",
          surface: "#232a2d",
          fg: "#dadada",
          muted: "#b3b9b8",
          line: "#2d3437",
          red: "#e57474",
          green: "#8ccf7e",
          yellow: "#e5c76b",
          blue: "#67b0e8",
          magenta: "#c47fd5",
          cyan: "#6cbfbf",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Gabarito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
