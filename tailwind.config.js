module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
};
