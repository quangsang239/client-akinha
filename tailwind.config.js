/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      "radius-c": "30% 70% 70% 30% / 30% 30% 70% 70% ",
    },
    extend: {
      colors: {
        "blue-c-1": "#BEEBF1",
        "pink-c-1": "#F3ACCC",
        "blue-c-2": "#BEEBF5",
        "purple-c-1": "#C2ADF3",
        "blue-c-3": "#90ABF4",
        "pink-c-2": "#E597D5",
      },
      spacing: {
        600: "600px",
      },
      keyframes: {
        background: {
          "0%": {
            transform: "translate(0,0)",
          },
          "100%": {
            transform: "translate(0,100px)",
          },
        },
      },
      animation: {
        "background-animation": "background 5s ease-in-out infinite alternate",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
