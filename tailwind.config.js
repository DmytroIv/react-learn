module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '20px',
    },
  },
  plugins: [require('daisyui')],
};
