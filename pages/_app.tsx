import { SWRConfig } from 'swr'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { NotFoundError, UnauthenticatedError } from '@/lib/api/utils'
import { fetcher } from "@/lib/global"

import '../styles/app.css'
import 'tailwindcss/tailwind.css'


const MyApp = ({ Component, pageProps }) => {
	
	const [queryClient] = useState(() =>
		new QueryClient({
			defaultOptions: {
				queries: {
					retry: (failureCount, error) => {
						// Don't retry on 404s
						if ( error instanceof NotFoundError || error instanceof UnauthenticatedError ) {
							return false
						}
						if (failureCount < 3) {
							return true
						}
						return false
					},
				},
			},
		})
	)

	const localStorageProvider = () => {
		// When initializing, we restore the data from `localStorage` into a map.
		const map = new Map(JSON.parse(localStorage.getItem('fastify') || '[]'))
		// Before unloading the app, we write back all the data into `localStorage`.
		window.addEventListener('beforeunload', () => {
			const appCache = JSON.stringify(Array.from(map.entries()))
			localStorage.setItem('fastify', appCache)
		})
		return map

		// if (typeof window !== 'undefined') {
		// 	const map = new Map(JSON.parse(localStorage.getItem('fastify') || '[]'))
		// 	// Before unloading the app, we write back all the data into `localStorage`.
		// 	window.addEventListener('beforeunload', () => {
		// 		console.log(localStorage.getItem('fastify'))
		// 		const appCache = JSON.stringify(Array.from(map.entries()))
		// 		localStorage.setItem('fastify', appCache)
		// 	})
		// 	// We still use the map for write & read for performance.
		// 	return map
		// }
	}
  
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ThemeProvider attribute="class">
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<UserProvider supabaseClient={supabaseClient}>
						<SWRConfig value={{ provider: typeof window !== 'undefined' && localStorageProvider, fetcher }}>
							{getLayout(<Component {...pageProps} />)}
						</SWRConfig>
					</UserProvider>
				</Hydrate>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
  

export default MyApp