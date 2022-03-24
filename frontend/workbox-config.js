module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,txt,html,css}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};