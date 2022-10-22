const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./pages/**/*.tsx', 
		'./src/components/**/*.tsx'
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		colors: {
			orange: colors.orange,
			slate: colors.slate,
			gray: colors.gray,
			red: colors.red,
			indigo: colors.indigo,
			teal: colors.teal,
			green: colors.green,
			white: "#FFFFFF",
			black: "#000000",
			transparent: colors.transparent
		},
		extend: {
			colors: {
				primary: {
					'50': '#e6f5fe',
					'100': '#c2e7ff',
					'200': '#9bd9ff',
					'300': '#70c9ff',
					'400': '#42aaf2',
					'500': '#1d9cf0',
					'600': '#158ee2',
					'700': '#097cd0',
					'800': '#016bbe',
					'900': '#004d9f',
					'2-50': '#e6eff9',
					'2-100': '#c2d7f4',
					'2-200': '#9dbeef',
					'dark-100': '#001D35'
				},
				secondary: {
					'50': '#fff0f1',
					'100': '#ffdad9',
					'200': '#f4b0a5',
					'300': '#f09080',
					'2-50': '#f4eded',
					'2-100': '#e0d2d3',
					'2-200': '#cab4b7',
					'dark-100': '#2D1516'
				}
			},
			width: {
				'100': '26rem',
			}
		}
	},
	plugins: [],
}