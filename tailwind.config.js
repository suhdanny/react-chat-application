/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/daisyui/dist/**/*.js'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['light'],
	},
	plugins: [require('daisyui')],
};
