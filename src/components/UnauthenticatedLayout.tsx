import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useUser } from '@supabase/auth-helpers-react'
import UserNav from "@/components/Auth/UserNav"
import { Quote } from "@/components/Quote"
import Logo from "@/components/Logo"
import { Settings } from "@/utils/settings"


const UnauthenticatedLayout = ({ children, title="Insperr – The Most Advanced Quotes Generator", home=false }) => {

	const { theme, setTheme } = useTheme()
	
	const user = useUser()

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [mounted])

	return <>
		<Head>
			<title>{title}</title>
		</Head>
		<div className="w-full overflow-hidden insperr-app relative">
			{Settings?.notices && 
				<div className={`p-0 md:p-5 md:pb-0 dark:bg-black ${home ? 'bg-slate-50' : 'bg-white'}`}>
					<div className="md:rounded-xl w-full dark:bg-primary-900 dark:bg-opacity-60 dark:text-primary-50 bg-primary-50 text-primary-600 py-3 px-5 text-center text-sm md:text-base" 
						dangerouslySetInnerHTML={{ __html: Settings?.notices }} />
				</div>}
			<section className={`relative overflow-hidden w-full text-black dark:text-white pb-14 dark:bg-black ${home ? 'bg-slate-50' : 'bg-white'}`}>
				<div style={{ zIndex: 0 }} className="absolute inset-y-0 w-full h-full">
					<div className="relative h-full">
						<svg className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full" width="404" height="784" fill="none" viewBox="0 0 404 784"><defs><pattern id="e229dbec-10e9-49ee-8ec3-0286ca089edf" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-slate-200 dark:text-zinc-900" fill="currentColor"></rect></pattern></defs><rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"></rect></svg>
						<svg className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4" width="404" height="784" fill="none" viewBox="0 0 404 784"><defs><pattern id="d2a68204-c383-44b1-b99f-42ccff4e5365" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-slate-200 dark:text-zinc-900" fill="currentColor"></rect></pattern></defs><rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"></rect></svg>
					</div>
				</div>
				<div className="relative w-full py-8 px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
					<header className="w-full text-lg flex items-center gap-10">
						<div className="flex-none flex items-center">
							<Link href="/" className="inline-block hover:text-slate-400 dark:hover:text-zinc-600 transition duration-200">
                                <Logo /></Link>
						</div>
						<div className="shrink w-full">
							<ul className="hidden md:block flex items-center text-base gap-8">
								<li><Link href="/pricing" className="inline-block hover:text-slate-400 dark:hover:text-zinc-600 transition duration-200">
									Our Pricing</Link></li>
							</ul>
						</div>
						<div className="flex-none flex items-center text-base gap-4">
							{user ? 
								<UserNav user={{
									id: user?.id,
									fullname: user?.user_metadata?.fullname,
									email: user?.email,
									avatar: user?.user_metadata?.avatar_url
								}} isAuthPage={true} />
							:
							<>
								<Link href="/access?op=signin" className="transition duration-200 hover:text-slate-400 dark:hover:text-zinc-600 flex items-center gap-3">
									<svg className="w-5 h-5 text-primary-500" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M9 15v7h13V2H9v7m9 3H0m13-5 5 5-5 5"></path></svg>
									Signin</Link>
							</>}
						</div>
					</header>
					{home &&
					<div className="w-full">
						<h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight normal-case fontBold w-full mt-8 md:mt-20 text-center mx-auto max-w-3xl md:px-10 px-0">
							Intelligent AI <span className="fontUltra text-primary-400">Quotes</span> generator
						</h1>
						<div className="w-full mt-4 text-base sm:text-xl text-center px-0 md:px-10 max-w-3xl mx-auto">
							With just lines of content in your style, Insperr leverages state-of-the-art language model to create human-like Insperr-Quotes in your writing style
						</div>
						<div className="w-full md:overflow-hidden relative">
							<div className="sm:mt-12 py-8 w-full flex justify-center opacity-100 md:opacity-0">
								<Quote quote={{
									content: 'The tech industry is booming and there are many opportunities for those with the right skills!',
									username: 'insperr',
									fullname: 'Insperr',
									tags: ['Tech'],
									avatar: require('../../public/images/insperr_avatar.png')
								}} />
							</div>
							<div style={{ zIndex: 1000, transform: 'translateX(-50%)', width: 1400 }} className="mt-12 top-0 hidden gap-x-8 items-start md:flex absolute inset-x-1/2">
								<div className="opacity-40 dark:opacity-60">
									<Quote quote={{
										content: 'If you\'re not using social media for marketing, you\'re missing out on a huge opportunity to reach potential customers.',
										username: 'insperr',
										fullname: 'Insperr',
										tags: ['Social Media', 'Internet'],
										avatar: require('../../public/images/insperr_avatar.png')
									}} />
								</div>
								<Quote quote={{
									content: 'The tech industry is booming and there are many opportunities for those with the right skills!',
									username: 'insperr',
									fullname: 'Insperr',
									tags: ['Tech'],
									avatar: require('../../public/images/insperr_avatar.png')
								}} />
								<div className="opacity-40 dark:opacity-60">
									<Quote quote={{
										content: 'Machine learning is one of the most fascinating and promising fields of technology. It has the potential to change the way ',
										username: 'insperr',
										fullname: 'Insperr',
										tags: ['Tech', 'Machine Learning'],
										avatar: require('../../public/images/insperr_avatar.png')
									}} />
								</div>
							</div>
						</div>
						<div className="w-full mt-12 text-center">
							<Link href="/user/g" className="w-auto inline-block text-white cursor-pointer mx-auto transition duration-200 transform scale-100 hover:scale-110 shadow-lg bg-primary-500 hover:bg-primary-700 py-4 px-8 text-base md:text-2xl rounded-full">
								Generate Custom Quotes</Link>
						</div>
					</div>}
				</div>
			</section>
			<main className="w-full">
				{children}
			</main>
			<footer className="mt-12 mb-8 w-full max-w-7xl mx-auto px-10 2xl:px-0">
				<div style={{ zIndex: 1006 }} className="fixed bottom-5 right-4">
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
				<div className="w-full">
					<div className="w-full py-8 max-w-2xl text-sm">
						<div className="w-full">
							Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories from all walks of life, so you can find the right quotes for you or others. You can use quotes for Instagram Post, Facebook, Twitter, Diaries, Whatsapp status, for profile entries, as motivation somewhere to write down and hang up. Reach other people with the right words. Finding good words isn't always easy.
						</div>
					</div>
					<div className="w-full">
						<div className="md:flex md:items-center md:gap-4 text-sm">
							<Link href="/privacy" className="hover:text-slate-600 dark:hover:text-zinc-600 transition-all md:float-none float-left mr-4 md-mr-0">
								Privacy</Link>
							<Link href="/terms" className="hover:text-slate-600 dark:hover:text-zinc-600 transition-all md:float-none float-left mr-4 md-mr-0">
								Terms of service</Link>
							<Link href="/about" className="hover:text-slate-600 dark:hover:text-zinc-600 transition-all md:float-none float-left mr-4 md-mr-0">
								About us</Link>
							<Link href="/roadmap" className="hover:text-slate-600 dark:hover:text-zinc-600 transition-all md:float-none float-left mr-4 md-mr-0">
								Our Roadmap</Link>
							<Link href="#" className="hover:text-slate-600 dark:hover:text-zinc-600 transition-all md:float-none float-left mr-4 md-mr-0">
								<div className="flex items-center gap-2">
									API 
									<span className="bg-red-50 dark:bg-zinc-800 transition-all text-red-600 dark:text-zinc-600 px-2 py-1 rounded-md text-xs">soon</span>
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