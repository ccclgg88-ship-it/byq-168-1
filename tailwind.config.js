/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'deep-bg': '#0d0b1a',
        'neon-cyan': '#00f5d4',
        'neon-pink': '#f72585',
        'surface': '#1a1730',
        'surface-light': '#2a2545',
      },
      fontFamily: {
        'display': ['ZCOOL KuaiLe', 'cursive'],
        'body': ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        'float-tag': 'floatTag 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-top': 'slideInTop 0.4s ease-out forwards',
      },
      keyframes: {
        floatTag: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(var(--tx, 20px), var(--ty, -15px)) rotate(var(--rot, 5deg)) scale(var(--sc, 1.05))' },
          '50%': { transform: 'translate(calc(var(--tx, 20px) * -0.5), calc(var(--ty, -15px) * 1.5)) rotate(calc(var(--rot, 5deg) * -1)) scale(calc(var(--sc, 1.05) * 0.95))' },
          '75%': { transform: 'translate(calc(var(--tx, 20px) * 0.7), calc(var(--ty, -15px) * -0.8)) rotate(calc(var(--rot, 5deg) * 0.5)) scale(var(--sc, 1.05))' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 212, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInTop: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
