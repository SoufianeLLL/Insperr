import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs'

export const middleware = withMiddlewareAuth({
	redirectTo: '/access',
	// authGuard: {
	// 	isPermitted: async (user) => user.email?.endsWith('@example.com') ?? false,
	// 	redirectTo: '/insufficient-permissions'
	// }
})

export const config = {
	matcher: ['/dashboard/:path*']
}