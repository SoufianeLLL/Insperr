import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi, TwitterApiTokens } from 'twitter-api-v2'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'
import supabaseAdmin from '@/utils/supabase-admin'
import { getIPAddressHash } from '@/lib/global'



export const twitterClient = new TwitterApi({
	appKey: process?.env.TWITTER_CONSUMER_KEY,
	appSecret: process?.env.TWITTER_CONSUMER_SECRET,
})


export const twitterUserClient = (accessToken: string, accessSecret: string): TwitterApi => {
	return new TwitterApi({
		appKey: process?.env.TWITTER_CONSUMER_KEY,
		appSecret: process?.env.TWITTER_CONSUMER_SECRET,
		accessToken,
		accessSecret,
	} as TwitterApiTokens)
}


export const twitterUserClientByToken = async (req: NextApiRequest, res: NextApiResponse): Promise<TwitterApi | null> => {
	// Gather token from cookie if null
	const cookies = new Cookies(req, res)
	const tokenId = cookies.get('token_id')
	if (!tokenId) return null

	// Gather token by id from datbase
	const { data, error } = await supabaseAdmin
		.from('tokens')
		.select('access_token, access_secret')
		.match({
			id: tokenId,
			ip_address_hash: getIPAddressHash(req),
		})
		.limit(1)
		.maybeSingle()

	const { access_token, access_secret } = data || {}
	if (error) console.error(`Error while searching token with id '${tokenId}'`, error)
	if (!access_token || !access_secret) return null

	return twitterUserClient(access_token, access_secret)
}


export const twitterUserClientForUserId = async (userId: string): Promise<TwitterApi | null> => {
	if (!userId) return null

	// Gather token by user_id from datbase
	const { data, error } = await supabaseAdmin
		.from('tokens')
		.select('access_token, access_secret')
		.not('access_token', 'is', null)
		.not('access_secret', 'is', null)
		.match({ user_id: userId })
		.limit(1)
		.maybeSingle()
	
	const { access_token, access_secret } = data || {}
	if (error) console.error(`Error while searching token for user with id '${userId}'`, error)
	if (!access_token || !access_secret) return null

	return twitterUserClient(access_token, access_secret)
}



export const appropriateTwitterUserClient = withApiAuth(async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient): Promise<TwitterApi | null> => {
	const { data: { user } } = await supabaseServerClient.auth.getUser()
	return user
		? await twitterUserClientForUserId(user.id)
		: await twitterUserClientByToken(req, res)
})