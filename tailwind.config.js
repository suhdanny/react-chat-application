/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/daisyui/dist/**/*.js'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['light', 'dark'],
	},
	plugins: [require('daisyui')],
};
