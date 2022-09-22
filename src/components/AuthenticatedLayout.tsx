import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { useUser } from '@supabase/auth-helpers-react'
import Loading from "@/components/Loading"
import UserNav from "./Auth/UserNav"


const isLoading = false

const AuthenticatedLayout = ({ children, title="The Most Advanced Quotes Generator" }) => {

	const router = useRouter()
	const { user } = useUser()	

	useEffect(() => {
		const keyDownHandler = (e) => {
			if (e.shiftKey === true) {
				switch (e?.key?.toLowerCase()) {
					case 'b':
						router?.back()
						break;
					case 'g':
						router?.push('/dashboard/user/g')
						break;
					case 'c':
						router?.push('/dashboard/user/collections')
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
			<title>Insperr – {title}</title>
		</Head>
		<div className="w-full insperr-app overflow-hidden bg-zinc-100">
			{isLoading ? <div className="w-full h-screen mx-auto text-center">
			<Loading width={50} height={50} /></div> : 
			<>
				<header style={{ zIndex: 1000 }} className="fixed top-0 right-0 left-0 w-full bg-white text-black shadow-sm">
					<div className="w-full py-6 px-10 2xl:px-0 max-w-7xl mx-auto">
						<div className="w-full text-lg flex items-center gap-10">
							<div className="flex-none logo text-xl fontInter font-semibold">
								<Link href="/"><a className="inline-bloc hover:text-zinc-400 transition duration-200">
									Insperr.com</a></Link>
							</div>
							<div className="shrink w-full"></div>
							<div className="flex-none text-base">
								<UserNav user={{
									fullname: user?.user_metadata?.fullname,
									email: user?.email
								}} />
							</div>
						</div>
					</div>
					<div className="w-full border-t border-zinc-100 px-10 2xl:px-0 max-w-7xl mx-auto">
						<div className="w-full flex items-center gap-10">
							<div className="w-full shrink flex items-center text-base">
								<Link href="/dashboard"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard' ? 'text-primary-500' : 'hover:-translate-y-1 hover:text-primary-500 translate-y-0'} py-4 pr-6 border-r border-zinc-100 transition duration-300 flex items-center gap-2 inline-bloc`}>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
									Dashboard</a></Link>
								<Link href="/dashboard/authors"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/authors' ? 'text-primary-500' : 'hover:-translate-y-1 hover:text-primary-500 translate-y-0'} py-4 px-6 border-r border-zinc-100 transform transition duration-300 flex items-center gap-2 inline-bloc`}>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
									Free Quotes by Authors</a></Link>
								<Link href="/dashboard/user/collections"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'user/collections' ? 'text-primary-500' : 'hover:-translate-y-1 hover:text-primary-500 translate-y-0'} py-4 px-6 transform transition duration-300 flex items-center gap-2 inline-bloc`}>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
									Your Collections</a></Link>
							</div>
							<div className="flex-none flex items-center text-base">
								<Link href="/dashboard/user/api"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'user/api' ? 'text-primary-500' : 'hover:-translate-y-1 hover:text-primary-500 translate-y-0'} py-4 px-6 border-r border-zinc-100 transform transition duration-300 flex items-center gap-2 inline-bloc`}>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
									API</a></Link>
								<Link href="/help/docs"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'help/docs' ? 'text-primary-500' : 'hover:-translate-y-1 hover:text-primary-500 translate-y-0'} py-4 pl-6 transform transition duration-300 flex items-center gap-2 inline-bloc`}>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
									Docs</a></Link>
							</div>
						</div>
					</div>
				</header>
				<div style={{ zIndex: 999 }} className="h-32 w-full inline-block"></div>
				<main className="w-full py-5">
					{children}
				</main>
				<footer className="mt-10 mb-6 w-full max-w-7xl mx-auto px-5 md:px-10 2xl:px-0">
					<div className="w-full text-sm">
						<div className="float-left inline-block">
							© {new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date())} All rights Reserved, Insperr — 
						</div>
						<div className="float-left inline-block h-2 w-4"></div>
						<Link href="/privacy"><a className="float-left mr-4 hover:text-zinc-600 md:float-none">Privacy</a></Link>
						<Link href="/terms"><a className="float-left mr-4 hover:text-zinc-600 md:float-none">Terms of service</a></Link>
						<Link href="/about"><a className="float-left mr-4 hover:text-zinc-600 md:float-none">About us</a></Link>
					</div>
				</footer>
			</>}
		</div>
	</>
}

export default AuthenticatedLayout