/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      dark: "#050D10",
      light: "#FFFFFF",
      transparent: "transparent",
      current: "currentColor",
      gain: "#28A745",
      loss: "#DB3700",
      primary: {
        500: "#0C6B94",
        600: "#137EAD",
        700: "#1B8EBF",
        800: "#58B3DA",
        900: "#D2EDF9",
      },
      secondary: {
        500: "#09662F",
        600: "#0C803A",
        700: "#0FA24A",
        800: "#13CC5D",
        900: "#DAFCE7",
      },
      neutral: {
        400: "#42474D",
        500: "#828E99",
        600: "#AAB4BD",
        700: "#CFD6DB",
        800: "#DFE9EB",
        900: "#F4F9FA",
      },
      accent: {
        500: "#CC377B",
        600: "#26BDA4",
        900: "#13CFD6",
      },
      alerts: {
        info: "#0099CC",
        success: "#339933",
        warning: "#FD7E14",
        danger: {
          500: "#CC3333",
          900: "#FFD9CC",
        },
      },
    },
    extend: {
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      gridTemplateColumns: {
        sidebar: "minmax(260px, 280px) 1fr",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
    },
  },
  plugins: [],
};
