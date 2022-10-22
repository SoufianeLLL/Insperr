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
import supabase from '@/lib/api/supabase'


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
			// console.log(event)
			if (!session) {
				await supabaseClient.auth.refreshSession()
			}
 			// else if (event === 'SIGNED_IN') {
			// 	const user = await supabaseClient.auth.getUser()
			// 	console.log(user)
			// }
 			else if (event === 'SIGNED_OUT') {
				router.push('/access?op=signin')
			}
		})
	
		return () => {
			if (subscription) subscription.unsubscribe()
		}
	}, [])
  
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ThemeProvider attribute="class">
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
						<SWRConfig value={{ provider: typeof window !== 'undefined' && localStorageProvider, fetcher }}>
							{getLayout(<Component {...pageProps} />)}
						</SWRConfig>
					</SessionContextProvider>
				</Hydrate>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default MyApp