/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "#3A1078",
				secondary: "#2F58CD",
				white: "#ffffff",
			  },
			  transitionProperty: {
				width: "width",
			  },
		},
	},
	plugins: [],
}
