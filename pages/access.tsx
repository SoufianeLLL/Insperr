import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import Logo from "@/components/Logo"
import Loading from "@/components/Loading"
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
	
	const signIn = async (provider) => {
		setFetching(true)
		await supabaseClient.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: redirect ?? `${process.env.NEXT_PUBLIC_URL_HOME}/dashboard`
			}
		})
	}


	return <>
		<Head>
			<title>Insperr – The Most Advanced Quotes Generator</title>
		</Head>
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-slate-200 px-5 py-10">
			{fetching ? <div className="w-full max-w-sm h-screen mx-auto text-center">
				<Loading text='null' width={50} height={50} /></div>
			: 
			<div className="shadow-lg max-w-sm mx-auto w-full text-center bg-white rounded-xl p-10">
				<div className="w-full">
					<div className="w-full justify-center flex items-center">
						<Logo i="text-primary-500 hover:text-primary-700 mx-auto" showText={false} size={70} />
					</div>
					<h1 className="text-2xl md:text-3xl fontBlack">
						<Link href="/">Insperr.com</Link>
					</h1>
					<div className="text-base text-slate-400 mb-8">Welcome back!</div>
					<div onClick={() => signIn('twitter')} className="w-full cursor-pointer mt-3">
						<BlueButton className="bg-primary-500 hover:bg-primary-700 text-white py-3 px-4 text-sm md:text-base" text={
							<div className="flex items-center text-normal gap-3 justify-center">
								<svg className="w-5 h-5 text-white" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
								Signin with Twitter
							</div>
						} fullWidth={true} smallSize={false} isLink={false} /></div>
					<div onClick={() => signIn('github')} className="w-full cursor-pointer mt-3">
						<BlueButton className="bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 text-sm md:text-base" text={
							<div className="flex items-center text-normal gap-3 justify-center">
								<svg className="w-5 h-5 text-white" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437.55.102.75-.238.75-.53 0-.26-.009-.952-.014-1.87-3.06.664-3.706-1.475-3.706-1.475-.5-1.27-1.221-1.61-1.221-1.61-.999-.681.075-.668.075-.668 1.105.078 1.685 1.134 1.685 1.134.981 1.68 2.575 1.195 3.202.914.1-.71.384-1.195.698-1.47-2.442-.278-5.01-1.222-5.01-5.437 0-1.2.428-2.183 1.132-2.952-.114-.278-.491-1.397.108-2.91 0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32a10.49 10.49 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128.6 1.514.223 2.633.11 2.911.705.769 1.13 1.751 1.13 2.952 0 4.226-2.572 5.156-5.022 5.428.395.34.747 1.01.747 2.037 0 1.47-.014 2.657-.014 3.017 0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"></path></svg>
								Signin with Github
							</div>
						} fullWidth={true} smallSize={false} isLink={false} /></div>
					{/* <div onClick={() => signIn('google')} className="w-full cursor-pointer mt-3">
						<BlueButton className="bg-gray-50 hover:bg-gray-100 text-black py-3 px-4 text-sm md:text-base" text={
							<div className="flex items-center text-normal gap-3 justify-center">
								<svg className="w-5 h-5 text-white" width="25" height="25" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"></path><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"></path><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"></path><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"></path></svg>
								Signin with Google
							</div>
						} fullWidth={true} smallSize={false} isLink={false} /></div> */}
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