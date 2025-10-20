module.exports = {
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        DEFAULT: "2px 2px 4px rgba(0,0,0,0.3)",
        lg: "4px 4px 6px rgba(0,0,0,0.4)",
      },
    },
    keyframes: {
      // Animation for the background gradient
      'pulse-slow': {
        '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
        '50%': { transform: 'scale(1.05)', opacity: '0.5' },
      },
      // Animation for elements fading in from bottom
      'fade-in-up': {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      // Animation for the profession text transition
      'fade-out-in': {
        '0%': { opacity: '0', transform: 'translateY(-10px)' },
        '50%': { opacity: '1', transform: 'translateY(0)' },
        '100%': { opacity: '0', transform: 'translateY(10px)' },
      },
    },
    animation: {
      'pulse-slow': 'pulse-slow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      const shadows = theme("textShadow");
      for (const [key, value] of Object.entries(shadows)) {
        newUtilities[`.text-shadow${key === "DEFAULT" ? "" : "-" + key}`] = {
          textShadow: value,
        };
      }
      addUtilities(newUtilities);
    },
  ],
};
