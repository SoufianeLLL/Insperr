import Head from "next/head"
import Link from "next/link"
import { useUser } from '@supabase/auth-helpers-react'
import UserNav from "./Auth/UserNav"
// import Loading from "@/components/Loading"


const UnauthenticatedLayout = ({ children, title="The Most Advanced Quotes Generator", home=false }) => {

	const { user } = useUser()

	return <>
		<Head>
			<title>Insperr – {title}</title>
		</Head>
		<div className="w-full onedomain-app">
			{/* {isLoading ? <div className="w-full h-screen mx-auto text-center">
			<Loading width={50} height={50} /></div> : 
			<> */}
				<header className="w-full text-black">
					<div className="w-full h-3 bg-primary-200"></div>
					<div className="w-full py-8 px-10 2xl:px-0 max-w-7xl mx-auto">
						<div className="w-full text-lg flex items-center gap-10">
							<div className="flex-none logo text-xl font-semibold fontInter">
								<Link href="/"><a className="inline-bloc hover:text-zinc-400 transition duration-200">
									Insperr.com</a></Link>
							</div>
							<div className="shrink w-full">
								<ul className="flex items-center text-base gap-8">
									<li><Link href="/authors"><a className="inline-bloc hover:text-zinc-400 transition duration-200">
										Free Quotes by Authors</a></Link></li>
									<li><Link href="/pricing"><a className="inline-bloc hover:text-zinc-400 transition duration-200">
										Our Pricing</a></Link></li>
								</ul>
							</div>
							<div className="flex-none flex items-center text-base gap-4">
								{user ? 
									<UserNav user={{
										fullname: user?.user_metadata?.fullname,
										email: user?.email
									}} isAuthPage={true} />
								:
								<>
									<Link href="/access?op=signin"><a className="transition duration-200 hover:text-zinc-400">
										Login</a></Link>
									<Link href="/access?op=signup"><a className="flex items-center gap-2 transition duration-200 hover:text-primary-500">
										<div className="bg-primary-400 rounded-full w-8 h-8 flex items-center justify-center text-white">
											<svg fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg></div>
										Create an account</a></Link>
								</>}
							</div>
						</div>
						{home &&
						<div className="w-full">
							<h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight normal-case fontBold w-full mt-8 md:mt-20 text-center mx-auto max-w-3xl md:px-10 px-5">
								The most advanced <span className="fontUltra text-primary-500">Quotes</span> generator
							</h1>
							<div className="w-full mt-4 text-base sm:text-xl text-center px-10 max-w-3xl mx-auto">
								Insperr is the fastest way to create your own quotes to save and share. Making beautiful quotes just became easy with AI!
							</div>
							<div className="h-80 w-full mt-12"></div>
							<div className="w-full mt-12 text-center">
								<Link href="/user/g"><a className="w-auto inline-block text-white cursor-pointer mx-auto transition duration-200 transform scale-100 hover:scale-110 shadow-lg bg-primary-500 hover:bg-primary-700 py-4 px-8 text-2xl rounded-full">
									Generate Custom Quotes</a></Link>
							</div>
						</div>}
					</div>
				</header>
				<main className="w-full py-7">
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
								<Link href="/privacy"><a className="hover:text-zinc-600 md:float-none float-left mr-4 md-mr-0">Privacy</a></Link>
								<Link href="/terms"><a className="hover:text-zinc-600 md:float-none float-left mr-4 md-mr-0">Terms of service</a></Link>
								<Link href="/about"><a className="hover:text-zinc-600 md:float-none float-left mr-4 md-mr-0">About us</a></Link>
								<Link href="/api"><a className="hover:text-zinc-600 md:float-none float-left mr-4 md-mr-0 flex items-center gap-2">API <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">Premium</span></a></Link>
							</div>
						</div>
					</div>
				</footer>
			{/* </>} */}
		</div>
	</>
}

export default UnauthenticatedLayout