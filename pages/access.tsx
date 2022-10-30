import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import Loading from "@/components/Loading"
import Logo from "@/components/Logo"
import BlueButton from "@/components/BlueButton"



const UserAccess = ({ op, redirect }) => {

	const user = useUser()
	const { supabaseClient } = useSessionContext()

	const router = useRouter()
	const [fetching, setFetching] = useState(false)

	useEffect(() => {
		if (user) {
			router.push('/dashboard')
		}
	})
	
	const signIn = async () => {
		// if (redirect === 'payment') {
		// 	const result = await fetch(`/api/stripe/customer/subscription/${p}`)
		// 	const res = await result?.json()
		// 	if (res?.id) {
		// 		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)
		// 		await stripe.redirectToCheckout({ sessionId: res?.id })
		// 	}
		// }
		setFetching(true)
		await supabaseClient.auth.signInWithOAuth({
			provider: 'twitter',
			options: {
				redirectTo: redirect ?? `${process.env.NEXT_PRUBLIC_URL_HOME}/dashboard/user/account`
			}
		})
	}


	return <>
		<Head>
			<title>Insperr – The Most Advanced Quotes Generator</title>
		</Head>
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-slate-200 py-10">
			{fetching ? <div className="w-full max-w-sm h-screen mx-auto text-center">
				<Loading text='null' width={50} height={50} /></div>
			: 
			<div className="shadow-lg max-w-sm mx-auto w-full text-center bg-white rounded-xl p-10">
				<div className="w-full">
					<div className="w-full justify-center flex items-center gap-5">
						<Image 
							alt="avatar"
							className="inline-block rounded-full"
							src={require('../public/images/avatar.jpg')} 
							placeholder="blur"
							unoptimized={true} 
							height={80}
							width={80} />
						<Logo i="text-primary-500 hover:text-primary-700 mx-auto" showText={false} size={70} />
					</div>
					<h1 className="text-2xl md:text-3xl fontBlack">
						Insperr.com
					</h1>
					<small className="text-base text-slate-400">Welcome back!</small>
					<div onClick={() => signIn()} className="w-full cursor-pointer mt-2">
						<BlueButton text={
							<div className="flex items-center gap-3 justify-center">
								<svg className="w-5 h-5 text-white" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
								Signin with Twitter
							</div>
						} fullWidth={true} smallSize={false} isLink={false} /></div>
				</div>
			</div>}
		</div>
	</>;
}

export async function getServerSideProps({ query }) {
	return { props: {
		op: query?.op ?? null,
		redirect: query?.redirect ?? null,
	}}
}

export default UserAccess