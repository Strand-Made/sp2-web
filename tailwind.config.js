module.exports = {
  purge: {
    content: ["./public/**/*.html", "./public/**/*.js"],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: {
        50: "#f5f7fa",
        100: "#e4e7eb",
        200: "#cbd2d9",
        300: "#9aa5b1",
        400: "#7b8794",
        500: "#616e7c",
        600: "#52606d",
        700: "#3e4c59",
        800: "#323f4b",
        900: "#1f2933",
      },
      purple: {
        50: "#d9e8ff",
        100: "#b0d0ff",
        200: "#88b1fc",
        300: "#5e8aee",
        400: "#3a66db",
        500: "#2251cc",
        600: "#1d3dbf",
        700: "#132dad",
        800: "#0b1d96",
        900: "#061178",
      },
      red: {
        50: "#ffe3e3",
        100: "#ffbdbd",
        200: "#ff9b9b",
        300: "#f86a6a",
        400: "#ef4e4e",
        500: "#e12d39",
        600: "#cf1124",
        700: "#ab091e",
        800: "#8a041a",
        900: "#610316",
      },
      yellow: {
        50: "#fffbea",
        100: "#fff3c4",
        200: "#fce588",
        300: "#fadb5f",
        400: "#f7c948",
        500: "#f0b429",
        600: "#de911d",
        700: "#cb6e17",
        800: "#b44d12",
        900: "#8d2b0b",
      },
    },
    //replace default font utility with imported fonts
    fontFamily: {
      roboto: ["roboto", "sans-serif"],
      coconpro: ["ff-cocon-pro", "sans-serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        "wave-pattern": "url('/public/assets/layered-waves-colorp.svg')",
        "wave-pattern-2": "url('/public/assets/wave-haikei.svg')",
        "ad-wave": "url('/public/assets/ad-wave.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
