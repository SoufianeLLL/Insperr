import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const siteUrl = 'https://insperr.com'
	const users = await fetch(`${siteUrl}/api/user/list`)
	const { usernames } = await users.json()
	const newsSitemaps = usernames.map((item) => ({
		loc: `${siteUrl}/user/@${item?.username}`,
		lastmod: new Date().toISOString(),
		changefreq: 'daily',
		priority: 0.7
	}))

	const fields = [...newsSitemaps]
	return getServerSideSitemap(ctx, fields)
}

export default function Sitemap() {}