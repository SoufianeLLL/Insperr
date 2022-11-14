import { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NotFoundError, UnauthenticatedError } from '@/lib/api/utils'
import { fetcher } from "@/lib/global"

import '../styles/app.css'
import 'tailwindcss/tailwind.css'


const MyApp = ({ Component, pageProps }) => {
	
	const router = useRouter()

	const [supabaseClient] = useState(() =>
		createBrowserSupabaseClient()
	)
	
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

	useEffect(() => {
		const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
		async (event, session) => {
			if (event === 'SIGNED_OUT') {
				router.push('/access?op=signin')
			}
			else if (!session) {
				await supabaseClient.auth.refreshSession()
			}
		})
	
		return () => {
			if (subscription) subscription.unsubscribe()
		}
	}, [])
  
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ThemeProvider attribute="class">
			<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<SWRConfig value={{ provider: typeof window !== 'undefined' && localStorageProvider, fetcher }}>
							{getLayout(<Component {...pageProps} />)}
						</SWRConfig>
					</Hydrate>
				</QueryClientProvider>
			</SessionContextProvider>
		</ThemeProvider>
	)
}

export default MyApp