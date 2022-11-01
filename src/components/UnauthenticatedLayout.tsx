import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { useUser } from '@supabase/auth-helpers-react'
import UserNav from "@/components/Auth/UserNav"
import { Quote } from "@/components/Quote"
import Logo from "@/components/Logo"
import { Settings } from "@/utils/settings"


const UnauthenticatedLayout = ({ children, title="Insperr – The Most Advanced Quotes Generator", home=false }) => {

	const user = useUser()

	useEffect(() => {
		document.body.classList.add("bg-white")
		document.body.classList.remove("bg-slate-100")
	}, [])

	return <>
		<Head>
			<title>{title}</title>
		</Head>
		<div className="w-full onedomain-app relative">
			{Settings?.notices && 
				<div className="p-5 pb-0">
					<div className="rounded-xl w-full bg-primary-50 text-primary-600 py-3 px-5 text-center text-base" 
						dangerouslySetInnerHTML={{ __html: Settings?.notices }} />
				</div>}
			<section className={`relative overflow-hidden w-full text-black pb-14 ${home ? 'bg-slate-50' : 'bg-white'}`}>
				<div style={{ zIndex: 0 }} className="absolute inset-y-0 w-full h-full">
					<div className="relative h-full">
						<svg className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full" width="404" height="784" fill="none" viewBox="0 0 404 784"><defs><pattern id="e229dbec-10e9-49ee-8ec3-0286ca089edf" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-slate-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"></rect></svg>
						<svg className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4" width="404" height="784" fill="none" viewBox="0 0 404 784"><defs><pattern id="d2a68204-c383-44b1-b99f-42ccff4e5365" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-slate-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"></rect></svg>
					</div>
				</div>
				<div className="relative w-full py-8 px-10 2xl:px-0 max-w-7xl mx-auto">
					<header className="w-full text-lg flex items-center gap-10">
						<div className="flex-none flex items-center">
							<Link href="/" className="inline-block hover:text-slate-400 transition duration-200">
                                <Logo /></Link>
						</div>
						<div className="shrink w-full">
							<ul className="flex items-center text-base gap-8">
								<li><Link href="/authors" className="inline-block hover:text-slate-400 transition duration-200">
									Real Quotes</Link></li>
								<li><Link href="/topics" className="inline-block hover:text-slate-400 transition duration-200">
									Topics</Link></li>
								<li><Link href="/pricing" className="inline-block hover:text-slate-400 transition duration-200">
									Our Pricing</Link></li>
							</ul>
						</div>
						<div className="flex-none flex items-center text-base gap-4">
							{user ? 
								<UserNav user={{
									id: user?.id,
									fullname: user?.user_metadata?.full_name,
									email: user?.email,
									avatar: user?.user_metadata?.avatar_url
								}} isAuthPage={true} />
							:
							<>
								<Link href="/access?op=signin" className="transition duration-200 hover:text-slate-400 flex items-center gap-3">
									<svg className="w-5 h-5 text-primary-500" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
									Signin with Twitter</Link>
								{/* <Link href="/access?op=signup" className="transition duration-200 hover:text-primary-500">
									<div className="flex items-center gap-2 ">
										<div className="bg-primary-400 rounded-full w-8 h-8 flex items-center justify-center text-white">
											<svg fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
										</div> 
										Create an account
									</div>
								</Link> */}
							</>}
						</div>
					</header>
					{home &&
					<div className="w-full">
						<h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight normal-case fontBold w-full mt-8 md:mt-20 text-center mx-auto max-w-3xl md:px-10 px-5">
							Intelligent GPT-3 <span className="fontUltra text-primary-400">Quotes</span> generator
						</h1>
						<div className="w-full mt-4 text-base sm:text-xl text-center px-10 max-w-3xl mx-auto">
							With just lines of content in your style, Insperr leverages state-of-the-art language model GPT-3 to create human-like Insperr-Quotes in your writing style
						</div>
						<div className="w-full py-12 mt-12 flex justify-center">
							<Quote quote={{
								content: 'The tech industry is booming and there are many opportunities for those with the right skills!',
								username: 'insperr',
								fullname: 'Insperr',
								tags: ['Tech'],
								avatar: null
							}} />
						</div>
						<div className="w-full mt-12 text-center">
							<Link href="/user/g" className="w-auto inline-block text-white cursor-pointer mx-auto transition duration-200 transform scale-100 hover:scale-110 shadow-lg bg-primary-500 hover:bg-primary-700 py-4 px-8 text-2xl rounded-full">
								Generate Custom Quotes</Link>
						</div>
					</div>}
				</div>
			</section>
			<main className="w-full">
				{children}
			</main>
			<footer className="mt-12 mb-8 w-full max-w-7xl mx-auto px-10 2xl:px-0">
				<div className="w-full">
					<div className="w-full py-8 max-w-2xl text-sm">
						<div className="w-full">
							Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories from all walks of life, so you can find the right quotes for you or others. You can use quotes for Instagram Post, Facebook, Twitter, Diaries, Whatsapp status, for profile entries, as motivation somewhere to write down and hang up. Reach other people with the right words. Finding good words isn't always easy.
						</div>
					</div>
					<div className="w-full">
						<div className="md:flex md:items-center md:gap-4 text-sm">
							<Link href="/privacy" className="hover:text-slate-600 md:float-none float-left mr-4 md-mr-0">
								Privacy</Link>
							<Link href="/terms" className="hover:text-slate-600 md:float-none float-left mr-4 md-mr-0">
								Terms of service</Link>
							<Link href="/about" className="hover:text-slate-600 md:float-none float-left mr-4 md-mr-0">
								About us</Link>
							<Link href="#" className="hover:text-slate-600 md:float-none float-left mr-4 md-mr-0">
								<div className="flex items-center gap-2">
									API 
									<span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">soon</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</>;
}

export default UnauthenticatedLayout