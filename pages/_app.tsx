import { ThemeProvider } from 'next-themes'
import { CookiesProvider } from "react-cookie"
// import { UserContextProvider } from '@/lib/userContext'
// import { PortfolioProvider } from '@/lib/globalStates'
// import { supabase } from '@/utils/supabase-client'

import '../styles/app.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			{/* <ThemeProvider attribute="class">
				<UserContextProvider supabaseClient={supabase}>
					<PortfolioProvider>
						<CookiesProvider>
							<Component {...pageProps} />
						</CookiesProvider>
					</PortfolioProvider>
				</UserContextProvider>
			</ThemeProvider> */}
			<ThemeProvider attribute="class">
				<CookiesProvider>
					<Component {...pageProps} />
				</CookiesProvider>
			</ThemeProvider>
		</>
	)
}

export default MyApp
