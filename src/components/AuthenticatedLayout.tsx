import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTheme } from 'next-themes'
import { useUser } from '@supabase/auth-helpers-react'
import Loading from "@/components/Loading"
import Aside from "@/components/Auth/Aside"


const isLoading = false

const AuthenticatedLayout = ({ children, padding=true, title="Insperr – The Most Advanced Quotes Generator" }) => {

	const { theme, setTheme } = useTheme()

	const router = useRouter()
	const user = useUser()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const keyDownHandler = (e) => {
			if (e.shiftKey === true && router.pathname?.replace(/^\/|\/$/g, '') !== 'dashboard/user/account') {
				switch (e?.key?.toLowerCase()) {
					case 'b':
						router?.back()
						break;
					case 'g':
						router?.push('/dashboard/user/g')
						break;
					case 'c':
						router?.push('/dashboard/user/collection')
						break;
					case 'm':
						router?.push(`/user/@${user?.user_metadata?.username}`)
						break;
					// case 'a':
					// 	router?.push('/dashboard/user/api')
					// 	break;
					case 'd':
						router?.push('/dashboard')
						break;
					case 'a':
						router?.push('/dashboard/analytics')
						break;
					// case 'h':
					// 	router?.push('/help/docs')
					// 	break;
					// case 's':
					// 	router?.push('/help/support')
					// 	break;
					case 'p':
						router?.push('/pricing')
						break;
					case 'u':
						router?.push('/dashboard/user/account')
						break;
					default:
						break;
				}
			}
		}
		document.addEventListener("keydown", keyDownHandler)
		return () => {
			document.removeEventListener("keydown", keyDownHandler)
		}
	}, [mounted])

	
	return <>
		<Head>
			<title>{title}</title>
		</Head>
		<div className="w-full insperr-app overflow-hidden">
			{isLoading ? 
				<div className="w-full h-screen mx-auto text-center"><Loading width={50} height={50} /></div> 
			: 
				<>
					<div className="w-full flex">
						<div className="flex-none h-screen w-3 w-24 md:w-72 overflow-hidden">
							<Aside user={user} />
						</div>
						<div className="ml-auto w-full flex-auto">
							<main className={`w-full ${padding ? 'p-5 md:p-10' : 'p-0'}`}>
								{children}
							</main>
						</div>
					</div>
					<div className="fixed bottom-5 right-4">
						{!mounted ? null : theme === 'light' ? 
							<div onClick={() => setTheme('dark')} className="py-2 pl-3 pr-5 rounded-full bg-slate-900 shadow text-white cursor-pointer flex items-center gap-3 text-sm">
								<svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9.874 5.008c2.728-1.68 6.604-1.014 8.25.197-2.955.84-5.11 3.267-5.242 6.415-.18 4.28 3.006 6.588 5.24 7.152-1.964 1.343-4.36 1.293-5.235 1.172-3.568-.492-6.902-3.433-7.007-7.711-.106-4.278 2.573-6.35 3.994-7.225z"></path></svg>
								Dark
							</div>
							:
							<div onClick={() => setTheme('light')} className="py-2 pl-3 pr-5 rounded-full bg-white shadow text-black cursor-pointer flex items-center gap-3 text-sm">
								<svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93m14.14 14.14-1.414-1.414M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path></svg>
								Light
							</div>
						}
					</div>
				</>
			}
		</div>
	</>
}

export default AuthenticatedLayout