/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-1": "#181b20",
        "black-2": "#333a44",
        "black-3": "#383B40",
        "white-1": "#fefefd",
        "white-2": "#ddd",
        "white-3": "#f4f8fb",
        "white-4": "#F4F4F4",
        "gray-1": "#d0d6de",
        "gray-2": " #dfdfdf",
        "gray-3": "#F9F9F9",
        "gray-4": "#979797",
        "gray-5": "#555d6a",
        "misty-rose-1": "#f2dbd7",
        "lavender-1": "#ded6fe",
        "violette-1": "#723cdc",
        "violette-2": "#E8E1FF",
        "blue-b": "#6DDCFA",
        "green-b": "#A7E4C3",
        "green-3": "#208080",
      },
      borderRadius: {
        "lg-exten": "10px",
        "xl-exten": "20px",
      },
      spacing: {
        "5%": "0px 5%",
        section: "7rem 5%",
      },
      backgroundImage: {
        "hero-pattern":
          "url('/images/6528caed853fb452ff2997e7_Ellipse.png'), linear-gradient(to bottom, #B8ECD1, #BDFFF3)",
        hero: "linear-gradient(to bottom, #B8ECD1, #BDFFF3)",
        "hero-2": "linear-gradient(to bottom, #BDFFF3, #FFFFFF)",
      },
      backgroundPosition: {
        "position-hero": "0px",
      },
      backgroundSize: {
        "size-hero": "16px, auto",
      },
      fontSize: {
        "5-5-xl": "4rem",
      },
      fontWeight: {
        "5-5-xl": "500",
      },
      lineHeight: {
        "5-5-xl": "1.2",
      },
    },
  },
  plugins: [],
};
