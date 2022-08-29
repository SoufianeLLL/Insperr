import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Loading from "@/components/Loading"
import { checkEmailValidation, checkPasswordValidation } from "@/lib/validation"


const userFields = {
	fullname: null,
	email: null,
	password: null,
	password2: null
}

const UserAccess = ({ op }) => {

	const [errors, setErrors] = useState(userFields)
	const [user, setUser] = useState(userFields)
	const [fetching, setFetching] = useState({ isLoading: false, text: null})
	
	const runAction = async (action, text) => {
		if (action === 'signup' || action === 'register' || action === 'new') {
			if (user?.fullname && user?.email && user?.password && user?.password2 && (user?.password === user?.password2)) {
				// setFetching({ isLoading: true, text })
				setErrors({
					email: (user?.email && checkEmailValidation(user?.email)) ? null : 'Please enter a valid email address.',
					fullname: (user?.fullname && user?.fullname?.length > 6 && user?.fullname?.length < 20) ? null : 'Your fullname must be between 6 and 20 characters.',
					password: (user?.password && checkPasswordValidation(user?.password)) ? null : 'Your password must contain lowercase letters, uppercase letters, numbers and must be between 8 and 15 characters.',
					password2: user?.password2 ? (user?.password !== user?.password2 ? 'The password confirmation does not match.' : null) : 'Please enter your password confirmation.'
				})
				if (!errors?.fullname && !errors?.email && !errors?.password && !errors?.password2) {
					setFetching({ isLoading: true, text })
					console.log('OK')
					// setFetching({ isLoading: false, text: null })
				}
			}
			else {
				setErrors({
					fullname: user?.fullname ? null : 'Please enter your fullname.',
					email: user?.email ? null : 'Please enter your email address.',
					password: user?.password ? null : 'Please enter your password.',
					password2: user?.password2 ? (user?.password !== user?.password2 ? 'The password confirmation does not match.' : null) : 'Please enter your password confirmation.'
				})
			}
		}
		else if (action === 'reset' || action === 'reset-password' || action === 'forget-password') {
			if (user?.email) {
				setFetching({ isLoading: true, text })
			}
			else {
				setErrors({
					...userFields,
					email: 'Please enter your email address.'
				})
			}
		}
		else {
			if (user?.email && user?.password) {
				setFetching({ isLoading: true, text })
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
			<title>Insperr – The Most Advanced Quotes Generator</title>
		</Head>
		<div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-zinc-200 py-10">
			{fetching?.isLoading ? <div className="w-full max-w-sm h-screen mx-auto text-center">
				<Loading text={fetching?.text ?? null} width={50} height={50} /></div>
			: 
			<div className="shadow-md max-w-sm mx-auto w-full bg-white p-10">
				<h1 className="text-xl md:text-2xl fontBlack flex items-center gap-2">
					<Link href="/"><a className="text-black hover:text-primary-500 transition duration-200"><svg className="w-6 mt-1" fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fillRule="nonzero"/></svg></a></Link>
					Insperr.</h1>
				{op === 'signup' || op === 'register' || op === 'new' ?
				<>
					<small className="text-zinc-400">Welcome dear! Please enter your details</small>
					<div className="mt-6">
						<div className="mb-6">
							<label className="block text-sm">Full Name</label>
							<input type="text" 
							onChange={(e) => {
								setUser({ ...user, fullname: e?.target?.value })
								setErrors({ ...errors, fullname: null })
							}}
							defaultValue={user?.fullname ?? null} placeholder="Enter your full name" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.fullname && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.fullname}</span>}
						</div>
						<div className="mb-6">
							<label className="block text-sm">Email</label>
							<input type="email" 
							onChange={(e) => {
								setUser({ ...user, email: e?.target?.value })
								setErrors({ ...errors, email: null })
							}}
							defaultValue={user?.email ?? null} placeholder="Enter your email" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
						</div>
						<div className="mb-6">
							<label className="block text-sm">Password</label>
							<input type="password" 
							onChange={(e) => {
								setUser({ ...user, password: e?.target?.value })
								setErrors({ ...errors, password: null })
							}}
							placeholder="*****" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.password && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password}</span>}
						</div>
						<div className="mb-6">
							<label className="block text-sm">Confirm Password</label>
							<input type="password" 
							onChange={(e) => {
								setUser({ ...user, password2: e?.target?.value })
								setErrors({ ...errors, password2: null })
							}}
							placeholder="*****" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.password2 && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password2}</span>}
						</div>
						<div className="mt-8 mb-2">
							<button onClick={() => runAction('signup', 'Please wait a few moments for your account to be created.')} className="block w-full text-center text-white bg-primary-500 transition duration-200 hover:bg-primary-700 px-2 py-1.5 rounded-md uppercase">Sign up</button>
						</div>
					</div>
					<div className="text-center">
						<span className="text-sm text-zinc-400">You have an account?</span>
						<Link href="/access?op=signin"><a className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign in</a></Link>
					</div>
				</>
				: (op === 'reset' || op === 'reset-password' || op === 'forget-password') ?
				<>
					<small className="text-zinc-400">We're sorry! Please enter your email</small>
					<div className="mt-6">
						<div className="mb-6">
							<label className="block text-sm">Email</label>
							<input type="email" 
							onChange={(e) => {
								setUser({ ...user, email: e?.target?.value })
								setErrors({ ...errors, email: null })
							}}
							defaultValue={user?.email ?? null} placeholder="Enter your email" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
						</div>
						<div className="mt-8 mb-2">
							<button onClick={() => runAction('resetpassword', 'Please wait a few moments, we will send you the link to create a new password.')} className="block w-full text-center text-white bg-primary-500 transition duration-200 hover:bg-primary-700 px-2 py-1.5 rounded-md uppercase">Reset password</button>
						</div>
					</div>
					<div className="text-center">
						<span className="text-sm text-zinc-400">Don't have account?</span>
						<Link href="/access?op=signin"><a className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign in</a></Link>
					</div>
				</>
				:
				<>
					<small className="text-zinc-400">Welcome back! Please enter your details</small>
					<div className="mt-6">
						<div className="mb-6">
							<label className="block text-sm">Email</label>
							<input type="email" 
							onChange={(e) => {
								setUser({ ...user, email: e?.target?.value })
								setErrors({ ...errors, email: null })
							}}
							defaultValue={user?.email ?? null} placeholder="Enter your email" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.email && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.email}</span>}
						</div>
						<div className="mb-6">
							<label className="block text-sm">Password</label>
							<input type="password" 
							onChange={(e) => {
								setUser({ ...user, password: e?.target?.value })
								setErrors({ ...errors, password: null })
							}}
							placeholder="*****" className="text-base block w-full border-0 border-b-2 border-zinc-300 focus:border-primary-700 focus:outline-none focus:ring-0 py-1 px-1.5 text-zinc-500" />
							{errors?.password && <span className="mt-1 text-red-500 text-sm leading-tight inline-block w-full">{errors?.password}</span>}
						</div>
						<div className="mb-3 flex flex-wrap content-center">
							<Link href="/access?op=reset-password"><a className="text-sm text-primary-500 hover:text-primary-700 transition-all">Forgot password?</a></Link>
						</div>
						<div className="mt-8 mb-2">
							<button onClick={() => runAction('signin', "Please wait a few moments, we're checking your credentials.")} className="block w-full text-center text-white bg-primary-500 transition duration-200 hover:bg-primary-700 px-2 py-1.5 rounded-md uppercase">Sign in</button>
						</div>
					</div>
					<div className="text-center">
						<span className="text-sm text-zinc-400">Don't have account?</span>
						<Link href="/access?op=signup"><a className="text-sm text-primary-500 hover:text-primary-700 transition-all ml-2">Sign up</a></Link>
					</div>
				</>}
			</div>}
		</div>
	</>
}

export async function getServerSideProps({ query }) {
	return { props: {
		op: query?.op ?? null,
	}}
}

export default UserAccess