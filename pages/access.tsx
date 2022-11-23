import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { loadStripe } from "@stripe/stripe-js/pure"
import { useUser } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { checkEmailValidation, checkPasswordValidation, checkUsernameValidation } from "@/lib/validation"
import { useForgotPasswordMutation, useSignInMutation, useSignUpMutation } from "@/lib/api/auth"
import { generateRandomAvatar, randomID } from "@/lib/global"
import sendEmail from "@/utils/sendgrid"
import Logo from "@/components/Logo"
import Loading from "@/components/Loading"
import BlueButton from "@/components/BlueButton"


const userFields = {
	username: null,
	fullname: null,
	email: null,
	password: null,
	password2: null,
	error: null
}


const UserAccess = ({ op, redirect, p }) => {

	const user = useUser()
	const router = useRouter()

	const [supabaseClient] = useState(() => createBrowserSupabaseClient())
	const [errors, setErrors] = useState(userFields)
	const [userData, setUser] = useState(userFields)
	const [fetching, setFetching] = useState({ isLoading: false, text: null})

	const { mutate: signUp } = useSignUpMutation()
	const { mutate: signIn } = useSignInMutation()
	const { mutate: forgotPassword } = useForgotPasswordMutation()

	useEffect(() => {
		if (user) {
			router.push('/dashboard')
		}
	})

	const startUserAccount = async (action, text) => {
		if (action === 'signup' || action === 'register' || action === 'new') {
			if (userData?.fullname && userData?.username && userData?.email && userData?.password && userData?.password2 && (userData?.password === userData?.password2)) {
				setErrors({
					email: checkEmailValidation(userData?.email),
					username: checkUsernameValidation(userData?.username),
					fullname: (userData?.fullname && userData?.fullname?.length > 6 && userData?.fullname?.length < 20) ? null : 'Your fullname must be between 6 and 20 characters.',
					password: checkPasswordValidation(userData?.password),
					password2: userData?.password2 ? (userData?.password !== userData?.password2 ? 'The password confirmation does not match.' : null) : 'Please enter your password confirmation.',
					error: null
				})
				if (!errors?.fullname && !errors?.username && !errors?.email && !errors?.password && !errors?.password2) {
					setFetching({ isLoading: true, text })
					// Set tour guide to 'True'
					window.localStorage.setItem('tour', 'true')
					let imageUrl
					const avatarFile = await generateRandomAvatar(userData?.fullname)
					const imageName = randomID(12)
					const { error } = await supabaseClient.storage
						.from('avatars')
						.upload(`public/${imageName}.png`, avatarFile)

					// Get the stored avatar image
					if (!error) {
						imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/public/${imageName}.png`
					}
					signUp(
						{
							username: (userData?.username).toString(),
							name: (userData?.fullname).toString(),
							email: (userData?.email).toString(),
							password: (userData?.password).toString(),
							avatar_url: userData?.fullname ? imageUrl : null,
							supabaseClient
						},
						{
							onError(error) {
								setErrors({
									...userFields,
									error: error?.message
								})
								setFetching({ isLoading: false, text: null })
							},
							async onSuccess() {
								if (p && redirect === `${process.env.NEXT_PUBLIC_URL_HOME}/pricing`) {
									const result = await fetch(`/api/stripe/customer/subscription/${p}`)
									const res = await result?.json()
									if (res?.id) {
										const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)
										await stripe.redirectToCheckout({ sessionId: res?.id })
									}
								}
								// Send Email
								await sendEmail({
									to: userData?.email,
									templateId: 'd-45ac67b991044746a87063a6b7eafaac',
									extraData: {
										name: (userData?.fullname).toString()?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1')
									}
								})
								// setFetching({ isLoading: false, text: null })
								router.push('/dashboard')
							},
						}
					)
				}
			}
			else {
				setErrors({
					username: userData?.username ? null : 'Please enter your username.',
					fullname: userData?.fullname ? null : 'Please enter your fullname.',
					email: userData?.email ? null : 'Please enter your email address.',
					password: userData?.password ? null : 'Please enter your password.',
					password2: userData?.password2 ? (userData?.password !== userData?.password2 ? 'The password confirmation does not match.' : null) : 'Please enter your password confirmation.',
					error: null
				})
			}
		}
		else if (action === 'reset' || action === 'reset-password' || action === 'forget-password') {
			if (userData?.email) {
				setFetching({ isLoading: true, text })
				const res = await forgotPassword({ email: userData?.email })
				console.log(res)
			}
			else {
				setErrors({
					...userFields,
					email: 'Please enter your email address.'
				})
			}
		}
		else {
			if (userData?.email && userData?.password) {
				setFetching({ isLoading: true, text })
				signIn(
					{
						email: (userData?.email).toString(),
						password: (userData?.password).toString(),
						supabaseClient
					},
					{
						onError(error) {
							setErrors({
								...userFields,
								error: error?.message
							})
							setFetching({ isLoading: false, text: null })
						},
						onSuccess() {
							window.location.href = '/dashboard'
							// router.push('/dashboard')
						},
					}
				)
			}
			else {
				setErrors({
					...userFields,
					email: 'Please enter your email address.',
					password: 'Please enter your email address.'
				})
			}
		}
	}

	return <>
		<Head>
            <link rel="canonical" href="https://insperr.com/access" />
			<title>Insperr – The Most Advanced Quotes Generator</title>
		</Head>
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-slate-200 dark:bg-black px-5 py-10">
			{fetching?.isLoading ? <div className="w-full max-w-sm h-screen mx-auto text-center">
				<Loading text='null' width={50} height={50} /></div>
			: 
			<div className="shadow-lg max-w-sm mx-auto w-full bg-white dark:bg-zinc-900 rounded-xl p-10">
				<div className="w-full">
					<div className="w-full justify-center flex items-center">
						<Logo i="text-primary-500 hover:text-primary-700 mx-auto" showText={false} size={70} />
					</div>
					<h1 className="text-2xl md:text-3xl full text-center fontBlack">
						<Link className="dark:text-white w-text-black" href="/">Insperr.com</Link>
					</h1>
					<div className="w-full">
						{op === 'signup' || op === 'register' || op === 'new' ?
							<>
								<small className="dark:text-zinc-900 text-slate-400">Welcome dear! Please enter your details</small>
								{errors?.error && <div className="text-red-500 mt-2 text-base">{errors?.error}</div>}
								<div className="mt-6">
									<div className="mb-6">
										<label className="block text-sm">Username</label>
										<input type="text" 
										onChange={(e) => {
											setUser({ ...userData, username: e?.target?.value })
											setErrors({ ...errors, username: null })
										}}
										defaultValue={userData?.username ?? null} placeholder="Enter your username" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.username && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.username}</span>}
									</div>
									<div className="mb-6">
										<label className="block text-sm">Full Name</label>
										<input type="text" 
										onChange={(e) => {
											setUser({ ...userData, fullname: e?.target?.value })
											setErrors({ ...errors, fullname: null })
										}}
										defaultValue={userData?.fullname ?? null} placeholder="Enter your full name" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.fullname && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.fullname}</span>}
									</div>
									<div className="mb-6">
										<label className="block text-sm">Email</label>
										<input type="email" 
										onChange={(e) => {
											setUser({ ...userData, email: e?.target?.value })
											setErrors({ ...errors, email: null })
										}}
										defaultValue={userData?.email ?? null} placeholder="Enter your email" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
									</div>
									<div className="mb-6">
										<label className="block text-sm">Password</label>
										<input type="password" 
										onChange={(e) => {
											setUser({ ...userData, password: e?.target?.value })
											setErrors({ ...errors, password: null })
										}}
										placeholder="*****" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.password && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password}</span>}
									</div>
									<div className="mb-6">
										<label className="block text-sm">Confirm Password</label>
										<input type="password" 
										onChange={(e) => {
											setUser({ ...userData, password2: e?.target?.value })
											setErrors({ ...errors, password2: null })
										}}
										placeholder="*****" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.password2 && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password2}</span>}
									</div>
									<div className="mt-8 mb-2">
										<div onClick={() => startUserAccount('signup', 'Please wait a few moments for your account to be created.')}>
											<BlueButton smallSize={false} text="Sign up" isLink={false} />
										</div>
									</div>
								</div>
								<div className="text-center">
									<span className="text-sm text-slate-400 dark:text-zinc-700">You have an account?</span>
									<Link
										href="/access?op=signin"
										className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign in</Link>
								</div>
							</>
						: (op === 'reset' || op === 'reset-password' || op === 'forget-password') ?
							<>
								<small className="text-slate-400 dark:text-zinc-400">We're sorry! Please enter your email</small>
								{errors?.error && <div className="text-red-500 mt-2 text-base">{errors?.error}</div>}
								<div className="mt-6">
									<div className="mb-6">
										<label className="block text-sm">Email</label>
										<input type="email" 
										onChange={(e) => {
											setUser({ ...userData, email: e?.target?.value })
											setErrors({ ...errors, email: null })
										}}
										defaultValue={userData?.email ?? null} placeholder="Enter your email" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
									</div>
									<div className="mt-8 mb-2">
										<div onClick={() => startUserAccount('resetpassword', 'Please wait a few moments, we will send you the link to create a new password.')}>
											<BlueButton smallSize={false} text="Reset password" isLink={false} />
										</div>
									</div>
								</div>
								<div className="text-center">
									<span className="text-sm text-slate-400 dark:text-zinc-700">Don't have account?</span>
									<Link
										href="/access?op=signin"
										className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign in</Link>
								</div>
							</>
						:
							<>
								<small className="text-slate-400 dark:text-zinc-400">Welcome back! Please enter your details</small>
								{errors?.error && <div className="text-red-500 mt-2 text-base">{errors?.error}</div>}
								<div className="mt-6">
									<div className="mb-6">
										<label className="block text-sm">Email</label>
										<input type="email" 
										onChange={(e) => {
											setUser({ ...userData, email: e?.target?.value })
											setErrors({ ...errors, email: null })
										}}
										defaultValue={userData?.email ?? null} placeholder="Enter your email" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
									</div>
									<div className="mb-6">
										<label className="block text-sm">Password</label>
										<input type="password" 
										onChange={(e) => {
											setUser({ ...userData, password: e?.target?.value })
											setErrors({ ...errors, password: null })
										}}
										placeholder="*****" className="bg-transparent text-base block w-full border-0 border-b-2 dark:border-zinc-700 dark:focus:border-primary-500 dark:text-zinc-400 border-slate-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-slate-500" />
										{errors?.password && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password}</span>}
									</div>
									<div className="mb-3 flex flex-wrap content-center">
										<Link
											href="/access?op=reset-password"
											className="text-sm text-primary-500 hover:text-primary-700 transition-all">Forgot password?</Link>
									</div>
									<div className="mt-8 mb-2">
										<div onClick={() => startUserAccount('signin', "Please wait a few moments, we're checking your credentials.")}>
											<BlueButton smallSize={false} text="Sign in" isLink={false} />
										</div>
									</div>
								</div>
								<div className="text-center">
									<span className="text-sm text-slate-400 dark:text-zinc-700">Don't have account?</span>
									<Link
										href="/access?op=signup"
										className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign up</Link>
								</div>
							</>}
					</div>
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