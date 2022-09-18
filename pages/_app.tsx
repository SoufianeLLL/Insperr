import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { NotFoundError, UnauthenticatedError } from '@/lib/api/utils'

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
  
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ThemeProvider attribute="class">
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<UserProvider supabaseClient={supabaseClient}>
						{getLayout(<Component {...pageProps} />)}
					</UserProvider>
				</Hydrate>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
  

export default MyApp