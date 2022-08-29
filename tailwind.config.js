const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./pages/**/*.tsx', 
		'./src/components/**/*.tsx'
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		colors: {
			sky: colors.sky,
			amber: colors.amber,
			orange: colors.orange,
			slate: colors.slate,
			gray: colors.gray,
			zinc: colors.zinc,
			red: colors.red,
			indigo: colors.indigo,
			teal: colors.teal,
			green: colors.green,
			blue: colors.blue,
			white: "#FFFFFF",
			black: "#000000",
		},
		extend: {
			colors: {
				primary: {
					'50': '#dcf9f9',
					'100': '#a8eff0',
					'200': '#70e3e7',
					'300': '#2fd6dd',
					'400': '#00ccd6',
					'500': '#00c3d2',
					'600': '#00b2bf',
					'700': '#009da5',
					'800': '#00898d',
					'900': '#006562'
				},
				orange: {
					'50': '#FFF7F3',
					'200': '#FFDACA'
				},
				amber: {
					'100': '#FFF2D6'
				}
			},
			width: {
				'100': '26rem',
			}
		}
	},
	plugins: [],
}