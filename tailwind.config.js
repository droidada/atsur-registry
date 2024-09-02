const theme = require("./src/data/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [{ pattern: /^swiper-/ }],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // container: {
    //   center: true,
    //   padding: "2rem",
    // },
    extend: {
      keyframes: {
        "sleek-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sleek-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      transitionProperty: {
        "opacity-transform": "opacity, transform",
      },
      transitionDuration: {
        500: "500ms",
      },
      transform: {
        "translate-x-full": "translateX(100%)",
        "translate-x-0": "translateX(0)",
      },
      colors: {
        primary: "#000000",
        secondary: "#D9D9D9",
        "primary-gray": "#AFADAD",
        "secondary-white": "#F3F3F3",
        "primary-green": "#00FF94",
        golden: "#CAAA62",
        gold: {
          50: "#fffaf0",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      backgroundImage: (theme) => ({
        "gold-gradient": `linear-gradient(135deg, ${theme(
          "colors.gold.300",
        )} 0%, ${theme("colors.gold.500")} 25%, ${theme(
          "colors.gold.700",
        )} 50%, ${theme("colors.gold.500")} 75%, ${theme(
          "colors.gold.300",
        )} 100%)`,
      }),
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(200px, 1fr))",
      },
      // colors: {
      //   primary: "#000000",
      //   text: theme.colors.default.text_color.default,
      //   light: theme.colors.default.text_color.light,
      //   dark: theme.colors.default.text_color.dark,
      //   primary: theme.colors.default.theme_color.primary,
      //   secondary: theme.colors.default.theme_color.secondary,
      //   body: theme.colors.default.theme_color.body,
      //   border: theme.colors.default.theme_color.border,
      //   "theme-light": theme.colors.default.theme_color.theme_light,
      //   "theme-dark": theme.colors.default.theme_color.theme_dark,
      //   darkmode: {
      //     text: theme.colors.darkmode.text_color.default,
      //     light: theme.colors.darkmode.text_color.light,
      //     dark: theme.colors.darkmode.text_color.dark,
      //     primary: theme.colors.darkmode.theme_color.primary,
      //     secondary: theme.colors.darkmode.theme_color.secondary,
      //     body: theme.colors.darkmode.theme_color.body,
      //     border: theme.colors.darkmode.theme_color.border,
      //     "theme-light": theme.colors.darkmode.theme_color.theme_light,
      //     "theme-dark": theme.colors.darkmode.theme_color.theme_dark,
      //   },
      // },
      // fontSize: {
      //   base: font_base + "px",
      //   h1: h1 + "rem",
      //   "h1-sm": h1 * 0.8 + "rem",
      //   h2: h2 + "rem",
      //   "h2-sm": h2 * 0.8 + "rem",
      //   h3: h3 + "rem",
      //   "h3-sm": h3 * 0.8 + "rem",
      //   h4: h4 + "rem",
      //   h5: h5 + "rem",
      //   h6: h6 + "rem",
      // },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
        brawler: ["Brawler", "sans-serif"],
        "bodrum-sans-11": ['"Bodrum Sans 11"', "sans-serif"],
        "bodrum-sans-10-hair": ['"Bodrum Sans 10 Hair"', "sans-serif"],
        "bodrum-sans-12-extra-light-ita": [
          '"Bodrum Sans 12 Extra Light Ita"',
          "sans-serif",
        ],
        "bodrum-sans-13": ['"Bodrum Sans 13"', "sans-serif"],
        "bodrum-sans-14": ['"Bodrum Sans 14"', "sans-serif"],
        "bodrum-sans-15": ['"Bodrum Sans 15"', "sans-serif"],
        "bodrum-sans-16": ['"Bodrum Sans 16"', "sans-serif"],
        "bodrum-sans-17-extra-bold-ita": [
          '"Bodrum Sans 17 Extra Bold Ita"',
          "sans-serif",
        ],
        "bodrum-sans-18": ['"Bodrum Sans 18"', "sans-serif"],
        "bodrum-sans-19": ['"Bodrum Sans 19"', "sans-serif"],
      },
      animation: {
        "sleek-in": "sleek-in 0.5s ease-out",
        "sleek-out": "sleek-out 0.5s ease-in",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
  ],
  important: true,
};
