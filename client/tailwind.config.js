/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0F0D",
          lime: "#A8C900",
          limeHover: "#96B400",
          green: "#18A66A",
          greenHover: "#138956",
          white: "#FFFFFF",
          soft: "#F8FAF9",
          dark: "#111714",
          surface: "#F2F5F3",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
        badge: "9999px",
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)',
        'elevated': '0 12px 32px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'premium': '0 20px 48px -12px rgba(15, 23, 42, 0.12), 0 8px 20px -4px rgba(15, 23, 42, 0.06)',
        'glow-green': '0 0 35px -5px rgba(24, 166, 106, 0.35)',
        'glow-lime': '0 0 35px -5px rgba(168, 201, 0, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
