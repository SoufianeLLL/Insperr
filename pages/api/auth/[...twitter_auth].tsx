
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'
import { twitterClient, twitterUserClient, twitterUserClientByToken, twitterUserClientForUserId } from '@/utils/twitter-client'
import { getIPAddressHash } from '@/lib/global'


export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse, supabaseServerClient) {
	const { twitter_auth: slug } = req.query
	const path = (slug as string[] || []).join('/')

	switch (path) {
		case 'twitter/login':
			return await handleTwitterLogin(req, res, supabaseServerClient)
		case 'twitter/callback':
			return await handleTwitterCallback(req, res, supabaseServerClient)
		case 'twitter/logout':
			return await handleTwitterLogout(req, res, supabaseServerClient)
		case 'twitter/user':
			return await handleTwitterGetUser(req, res, supabaseServerClient)
		// case 'twitter/timeline':
		// 	return await handleTwitterGetUserTimeline(req, res, supabaseServerClient)
		default:
			return res.status(404).end()
	}
})


/**
 * Generates Twitter authentication URL and temporarily stores `oauth_token` in database. 
 */
export const handleTwitterLogin = async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient) => {
	// Determine Twitter Auth-Link
	let authLink
	try {
		authLink = await twitterClient.generateAuthLink(`${process.env.NEXT_PUBLIC_URL_HOME}/api/auth/twitter/callback`)
	}
	catch (e) {
		console.error(e)
	}
	if (!authLink?.url || !authLink?.oauth_token || !authLink?.oauth_token_secret) {
		return res.status(500).end()
	}

	// Save temporary token to database
	const { data: { user } } = await supabaseServerClient.auth.getUser()
	const user_id = user?.id
	const ip_address_hash = getIPAddressHash(req)
	const { data: token, error } = await supabaseServerClient
		.from('tokens')
		.insert({
			redirect: req.body?.redirect,
			oauth_token: authLink.oauth_token,
			oauth_token_secret: authLink.oauth_token_secret,
			...(user_id ? { user_id } : null),
			...(!user_id ? { ip_address_hash } : null),
		})
		.select()
		.single()
	
	if (error || !token?.id) {
		return res.status(500).end()
	}

	return res.status(200).json({
		token_id: token?.id,
		url: authLink.url,
	})
}


/**
 * Handles Twitters authentication callback, fetches permanent access-tokens, 
 * and saves them to the database.
 */
export const handleTwitterCallback = async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient) => {
	const oauth_token = req.query?.oauth_token as string
	const oauth_verifier = req.query?.oauth_verifier as string
	if (!oauth_token || !oauth_verifier) {
		console.error('No \'oauth_token\' in callback request')
		return res.redirect('/')
	}

	// Get existing token from database
	const { data: { user } } = await supabaseServerClient.auth.getUser()
	const user_id = user?.id
	const ip_address_hash = getIPAddressHash(req)
	const { data: token, error } = await supabaseServerClient
		.from('tokens')
		.select('*')
		.match({
			oauth_token,
			...(user_id ? { user_id } : null),
			...(!user_id ? { ip_address_hash } : null),
		})
		.limit(1)
		.single()
	
	const oauth_token_secret = token?.oauth_token_secret
	if (error || !oauth_token_secret) {
		console.error('Error while accessing database or \'oauth_token_secret\' not found', error)
		return res.redirect('/')
	}

	try {
		// Create twitter user-client from temporary tokens
		const twitterClient = twitterUserClient(oauth_token, oauth_token_secret)
		const { accessToken: access_token, accessSecret: access_secret } = await twitterClient.login(oauth_verifier)


		// Delete all existing with duplicate tokens
		await supabaseServerClient
			.from('tokens')
			.delete()
			.neq('id', token.id)
			.match({ access_token, access_secret })
		
		if (user_id) {
			await supabaseServerClient
				.from('tokens')
				.delete()
				.neq('id', token.id)
				.match({ user_id })
		}

		// Update with permanent token, delete temporary tokens
		const { data: newToken, error } = await supabaseServerClient
			.from('tokens')
			.update({
				access_token,
				access_secret,
				oauth_token: null,
				oauth_token_secret: null,
			})
			.eq('oauth_token', oauth_token)
			.select()
			.single()
			
		if (error || !newToken?.id) {
			console.error('Error while updating access-tokens', error)
			return res.redirect('/')
		}

		// Store token_id as http-only cookie if no user is logged-in
		if (!user_id) {
			const cookies = new Cookies(req, res)
			const maxAge = 24 * 60 * 60 * 1000
			cookies.set('token_id', newToken?.id, { maxAge })
		}

		// Successfully authenticated, redirecting…
		return res.redirect(newToken?.redirect || '/')
	}
	catch (e) {
		console.error('Error while logging in with twitter user-client', e)
		return res.redirect(token?.redirect || '/')
	}
}


/**
 * Handles logout of twitter user and removes token from the database and cookie 
 */
export const handleTwitterLogout = async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient) => {
	const cookies = new Cookies(req, res)
	const tokenId = cookies.get('token_id')

	const { error } = await supabaseServerClient
		.from('tokens')
		.delete()
		.eq('id', tokenId)
		.not('access_token', 'is', null)
		.not('access_secret', 'is', null)

	if (!error) {
		await supabaseServerClient
			.from('users')
			.update({
				metadata: {
					auto_post: false
				}
			})
	}
	
	if (error) console.error(`Error while deleting token with id '${tokenId}' on logout`, error)
	cookies.set('token_id', null)
	return res.status(200).end()
}


/**
 * After a user has signed-up after authenticating with Twitter,
 * the existing token is assigned and persisted with the user-id.
 */
export const autoAssignTokenToUser = async (req: NextApiRequest, res: NextApiResponse, userId: string, supabaseServerClient) => {
	const cookies = new Cookies(req, res)
	const tokenId = cookies.get('token_id')
	if (!userId || !tokenId) return

	// Update token with user_id 
	const { data: token, error } = await supabaseServerClient
		.from('tokens')
		.update({
			user_id: userId,
			ip_address_hash: null,
		})
		.match({
			id: tokenId,
			ip_address_hash: getIPAddressHash(req),
		})
		.limit(1)
		.single()
	
	if (error || !token?.user_id) {
		console.error('Error while updating access-tokens', error)
	}
	// Reset token_id cookies (only needed without user-auth)
	cookies.set('token_id', null)
}


/**
 * Returns authenticated twitter user (by token_id cookie)
 */
export const handleTwitterGetUser = async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient) => {
	const handleForbidden = () => {
		const cookies = new Cookies(req, res)
		cookies.set('token_id', null)
		return res.status(200).end()
	}

	// Determine token either by token_id or logged-in user_id 
	const { data: { user } } = await supabaseServerClient.auth.getUser()
	let client = user ? await twitterUserClientForUserId(user.id) : await twitterUserClientByToken(req, res)

	if (user && !client) {
		client = await twitterUserClientByToken(req, res)
		if (client) {
			await autoAssignTokenToUser(req, res, user.id, supabaseServerClient)
		}
	}

	if (!client) return handleForbidden()
	// Verify credentials via twitter api
	const twitterUser = await client.v1.verifyCredentials()
	if (!twitterUser) return handleForbidden()

	return res.status(200).json(twitterUser)
}


/**
 * Returns user timeline tweets
 */
export const handleTwitterGetUserTimeline = async (req: NextApiRequest, res: NextApiResponse, supabaseServerClient) => {
	const handleForbidden = () => {
		const cookies = new Cookies(req, res)
		cookies.set('token_id', null)
		return res.status(200).end()
	}

	// Determine token either by token_id or logged-in user_id 
	const { data: { user } } = await supabaseServerClient.auth.getUser()
	let client = user ? await twitterUserClientForUserId(user.id) : await twitterUserClientByToken(req, res)

	if (user && !client) {
		client = await twitterUserClientByToken(req, res)
		if (client) {
			await autoAssignTokenToUser(req, res, user.id, supabaseServerClient)
		}
	}

	if (!client) return handleForbidden()
	// Stream latest tweets from timeline
	const tweetsFromTimeline = await client.v2.userTimeline(user.id, { exclude: 'replies' });

	if (!tweetsFromTimeline) return handleForbidden()
	return res.status(200).json(tweetsFromTimeline)
}