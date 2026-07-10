/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        earth: {
          forest:  "#1B4332",
          dark:    "#2D6A4F",
          mid:     "#40916C",
          soft:    "#52B788",
          pale:    "#74C69D",
          mist:    "#B7E4C7",
        },
        gold: {
          DEFAULT: "#F4A261",
          deep:    "#E76F51",
          amber:   "#EFBA6B",
        },
        soil: {
          dark:    "#5C3D1E",
          DEFAULT: "#7C5C3A",
          mid:     "#BC8A5F",
          light:   "#D9B896",
        },
        parchment: "#F8F5F0",
        cream:     "#FEFAF4",
      },
      animation: {
        "fade-in-up":     "fadeInUp 0.5s ease both",
        "fade-in":        "fadeIn 0.4s ease both",
        "slide-in-right": "slideInRight 0.5s ease both",
        "scale-in":       "scaleIn 0.4s ease both",
        "pulse-soft":     "pulseSoft 2s ease-in-out infinite",
        "leaf-sway":      "leafSway 3s ease-in-out infinite",
        "bounce-gentle":  "bounceGentle 2s ease-in-out infinite",
        "shimmer":        "shimmer 4s linear infinite",
      },
      keyframes: {
        fadeInUp:     { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:       { from: { opacity: "0" }, to: { opacity: "1" } },
        slideInRight: { from: { opacity: "0", transform: "translateX(30px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        scaleIn:      { from: { opacity: "0", transform: "scale(0.92)" }, to: { opacity: "1", transform: "scale(1)" } },
        pulseSoft:    { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.7", transform: "scale(0.97)" } },
        leafSway:     { "0%,100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        bounceGentle: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        shimmer:      { from: { backgroundPosition: "-200% center" }, to: { backgroundPosition: "200% center" } },
      },
      boxShadow: {
        card:  "0 4px 24px rgba(45, 106, 79, 0.10)",
        hover: "0 12px 40px rgba(45, 106, 79, 0.18)",
        gold:  "0 8px 32px rgba(244, 162, 97, 0.25)",
      },
    },
  },
  plugins: [],
};
