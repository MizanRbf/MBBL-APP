/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        EduAUVICWANTDots_bold: ['EduAUVICWANTDots-Bold'],
        EduAUVICWANTDots_regular: ['EduAUVICWANTDots-Regular'],
        EduAUVICWANTDots_semiBold: ['EduAUVICWANTDots-SemiBold'],
        EduAUVICWANTDots_medium: ['EduAUVICWANTDots-Medium'],
      },
    },
  },
  plugins: [],
};
