import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { useUser } from '@supabase/auth-helpers-react'
import Loading from "@/components/Loading"
import UserSidebar from "./Auth/Aside"


const isLoading = false

const AuthenticatedLayout = ({ children, title="Insperr – The Most Advanced Quotes Generator" }) => {

	const router = useRouter()
	const { user } = useUser()	

	useEffect(() => {        
        document.body.classList.add("bg-slate-100")
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
					case 'a':
						router?.push('/dashboard/user/api')
						break;
					case 'd':
						router?.push('/dashboard')
						break;
					case 'h':
						router?.push('/help/docs')
						break;
					case 's':
						router?.push('/help/support')
						break;
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
		return () => document.removeEventListener("keydown", keyDownHandler)
	}, [])

	
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
							<UserSidebar router={router} user={user} />
						</div>
						<div className="ml-auto w-full flex-auto">
							<main className="w-full p-5 md:p-10">
								{children}
							</main>
							{/* <footer className="mt-10 mb-6 w-full max-w-7xl mx-auto px-5 md:px-10 2xl:px-0">
								<div className="w-full text-sm">
									<div className="float-left inline-block">
										© {new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date())} All rights Reserved, Insperr — 
									</div>
									<div className="float-left inline-block h-2 w-4"></div>
									<Link href="/privacy"><a className="float-left mr-4 hover:text-slate-600 md:float-none">Privacy</a></Link>
									<Link href="/terms"><a className="float-left mr-4 hover:text-slate-600 md:float-none">Terms of service</a></Link>
									<Link href="/about"><a className="float-left mr-4 hover:text-slate-600 md:float-none">About us</a></Link>
								</div>
							</footer> */}
						</div>
					</div>
				</>
			}
		</div>
	</>
}

export default AuthenticatedLayout