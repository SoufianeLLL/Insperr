const siteUrl = 'https://insperr.com'

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: [
		'/api/*',
		'/dashboard/*',
		'/payment/*',
		'/server-sitemap.xml',
		'/404'
	],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				userAgent: '*',
				disallow: [
					'/api/*',
					'/dashboard/*',
					'/payment/*',
					'/404'
				],
			},
		],
		additionalSitemaps: [
			`${siteUrl}/server-sitemap.xml`,
		]
	}
}