const siteUrl = 'https://insperr.com'

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: [
		'/dashboard/*',
		'/payment/*',
		'/server-sitemap.xml',
		// '/api/*',
		// '/404'
	],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			// {
			// 	userAgent: '*',
			// 	disallow: [
			// 		'/api/*',
			// 		'/dashboard/*',
			// 		'/payment/*',
			// 		'/404'
			// 	],
			// },
		],
		additionalSitemaps: [
			`${siteUrl}/server-sitemap.xml`,
		]
	}
}