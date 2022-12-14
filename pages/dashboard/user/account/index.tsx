import useSWR from 'swr'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Tooltip } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSignOutMutation } from '@/lib/api/auth'
import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { checkEmailValidation, checkPasswordValidation, checkUsernameValidation } from "@/lib/validation"
import sendEmail from '@/utils/sendgrid'
import Loading from '@/components/Loading'
import BlueButton from "@/components/BlueButton"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const ShowToast = dynamic(() => import("@/components/ShowToast"))



const UserAccount = ({ q_screen, q_errors }) => {

	const user = useUser()
	const router = useRouter()
	const [supabaseClient] = useState(() => createBrowserSupabaseClient())
	const { isLoading } = useSessionContext()

	const { mutate: signOut } = useSignOutMutation()

	let { isValidating: isCheckingSubscription, data: isSubscribed } = useSWR(`/api/user?action=checkUserSubscription`)
	let { isValidating: isCheckingTwitterAccount, data: isTwitterAccountLinked } = useSWR(`/api/user?action=checkTwitterLinking`)
	const { isValidating: isCheckingAutoPost, data: checkAutoPost } = useSWR(`/api/user?id=${user?.id}&action=checkAutoPost`)

	const [error, setError] = useState(null)
	const [connect, setConnect] = useState(false)
	const [disconnect, setDisconnect] = useState(false)
	const [loadingPortal, setLoadingPortal] = useState(false)
	const [automation, setAutomation] = useState({ autoPostActive: false })
	const [action, setAction] = useState({ name: null, params: null, isLoading: false, password: null })
	const [screen, setScreen] = useState({ name: null, title: null })
	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })

	
	useEffect(() => {
		setAutomation({ autoPostActive: checkAutoPost })
		return () => {
			setAutomation({ autoPostActive: false })
		}
	}, [])

	const connectTwitterAccount = async () => {
		setConnect(true)
		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL_HOME}/api/auth/twitter/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					redirect: `${process.env.NEXT_PUBLIC_URL_HOME}/dashboard/user/account`
				})
			})
			const res = await result?.json()
			if (res) {
				// Send Email
				await sendEmail({
					to: user?.email,
					templateId: 'd-f91852a478354813a817901d80e72c64',
					extraData: {
						title: '???? Gongrats',
						name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
						status: 'connected'
					}
				})
				router?.push(res?.url)
			}
		}
		catch (e) {
			setConnect(false)
			console.error(e)
		}
	}

	const disconnectTwitterAccount = async () => {
		setDisconnect(true)
		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL_HOME}/api/auth/twitter/logout`)
			const res = await result?.json()
			if (!res) {
				// Send Email
				await sendEmail({
					to: user?.email,
					templateId: 'd-f91852a478354813a817901d80e72c64',
					extraData: {
						title: 'Thank you',
						name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
						status: 'disconnected'
					}
				})
				router?.push(`${process.env.NEXT_PUBLIC_URL_HOME}/dashboard`)
			}
		}
		catch (e) {
			setDisconnect(false)
			console.error(e)
		}
	}

	const handleScreenChange = ({ name, title }) => {
		setError(null)
		setAction({ name: null, params: null, isLoading: false, password: null })
		setScreen({ name, title })
	}

	const handleChange = ({ name, params }) => {
		switch (name) {
			case 'changeFullname':
				setError((params?.target && params?.target?.length > 6 && params?.target?.length < 20) ? null : 'Your fullname must be between 6 and 20 characters.')
				break;
			case 'changeUsername':
				setError(checkUsernameValidation(params?.target))
				break;
			case 'changeEmail':
				setError(checkEmailValidation(params?.target))
				break;
			case 'changePassword':
				setError(checkPasswordValidation(params?.target))
				break;
		}
		setAction({ ...action, name, params })
	}

	const newRequest = async () => {
		if (!error && screen?.name && screen?.name === 'automation') {
			if (isTwitterAccountLinked) {
				const val = !automation?.autoPostActive
				setAutomation({ autoPostActive: val })
				// Change user's Auto-Post value from Database
				const { data: res } = await supabaseClient
					.from('users')
					.select('metadata')
					.eq('id', user?.id)
					.single()
	
				if (res?.metadata) {
					const { error } = await supabaseClient
						.from('users')
						.update({ metadata: { ...res?.metadata, auto_post: val } })
						.eq('id', user?.id)
					
					if (error) {
						setAutomation({ autoPostActive: !val })
					}
					else {
						// Send Email
						await sendEmail({
							to: user?.email,
							templateId: 'd-1727b6155d554d2a84aa3b883aaa1088',
							extraData: {
								name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
								target: 'AutoTweet status',
								value: 'to ON, from now on your generated quotes will be scheduled to be tweeted automatically within the first 5 minutes from the date of creation'
							}
						})
					}
				}
				else {
					setAutomation({ autoPostActive: !val })
				}
			}
		}
		else if (!error && action?.name) {
			let _continue = true
			setAction({ ...action, isLoading: true })
			// check first the current password
			try {
				const { error } = await supabaseClient.auth.signInWithPassword({
					email: user?.email,
					password: action?.password,
				})
				if (error) {
					_continue = false
					setAction({ name: null, params: null, isLoading: false, password: null })
					setCallbackToast({ status: 'error', text: 'Your current password is invalid, please try again.' })
				}
			}
			catch (e) {
				setAction({ name: null, params: null, isLoading: false, password: null })
				setCallbackToast({ status: 'error', text: e })
			}

			if (_continue) {
				if (action?.name === 'changeUsername') {
					try {
						const result = await fetch('/api/user/update', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								action: action?.name,
								user_id: user?.id,
								params: {
									user_metadata: user?.user_metadata,
									username: action?.params?.target
								}
							})
						})
						const { error } = await result?.json()
						if (!error) {							
							setAction({ name: null, params: null, isLoading: false, password: null })
							// Send Email
							await sendEmail({
								to: user?.email,
								templateId: 'd-1727b6155d554d2a84aa3b883aaa1088',
								extraData: {
									name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
									target: 'username',
									value: `to ${action?.params?.target}. Please use your new information to login to your account`
								}
							})
							// must LogOut to set the new Username
							signOut({ supabaseClient })
						}
					}
					catch (e) {
						setAction({ name: null, params: null, isLoading: false, password: null })
						setCallbackToast({ status: 'error', text: e })
					}
				}
				else if (action?.name === 'changeEmail') {
					try {
						const result = await fetch('/api/user/update', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								action: action?.name,
								user_id: user?.id,
								params: {
									email: action?.params?.target
								}
							})
						})
						const { error } = await result?.json()
						if (!error) {							
							setAction({ name: null, params: null, isLoading: false, password: null })
							// Send Email
							await sendEmail({
								to: user?.email,
								templateId: 'd-1727b6155d554d2a84aa3b883aaa1088',
								extraData: {
									name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
									target: 'email address',
									value: `to ${action?.params?.target}. Please use your new information to login to your account`
								}
							})
							// must LogOut to set the new Email
							signOut({ supabaseClient })
						}
					}
					catch (e) {
						setAction({ name: null, params: null, isLoading: false, password: null })
						setCallbackToast({ status: 'error', text: e })
					}
				}
				else if (action?.name === 'changeFullname') {
					try {
						const result = await fetch('/api/user/update', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								action: action?.name,
								user_id: user?.id,
								params: {
									user_metadata: user?.user_metadata,
									fullname: action?.params?.target
								}
							})
						})
						const { error } = await result?.json()
						if (!error) {							
							setAction({ name: null, params: null, isLoading: false, password: null })
							// Send Email
							await sendEmail({
								to: user?.email,
								templateId: 'd-1727b6155d554d2a84aa3b883aaa1088',
								extraData: {
									name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
									target: 'fullname',
									value: `to ${action?.params?.target}.`
								}
							})
							// must LogOut to set the new Email
							signOut({ supabaseClient })
						}
					}
					catch (e) {
						setAction({ name: null, params: null, isLoading: false, password: null })
						setCallbackToast({ status: 'error', text: e })
					}
				}
				else if (action?.name === 'changePassword') {
					try {
						const { error } = await supabaseClient.auth.updateUser({
							password: action?.params?.target
						})
						if (!error) {							
							setAction({ name: null, params: null, isLoading: false, password: null })
							// Send Email
							await sendEmail({
								to: user?.email,
								templateId: 'd-1727b6155d554d2a84aa3b883aaa1088',
								extraData: {
									name: user?.user_metadata?.fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
									target: 'password',
									value: `. Please use your new information to login to your account`
								}
							})
							// must LogOut to set the new Password
							signOut({ supabaseClient })
						}
					}
					catch (e) {
						setAction({ name: null, params: null, isLoading: false, password: null })
						setCallbackToast({ status: 'error', text: e })
					}
				}

				setAction({ name: null, params: null, isLoading: false, password: null })
				setCallbackToast({ status: 'success', text: 'Your information was updated.' })
			}
		}
	}

	const loadPortal = async () => {
		setLoadingPortal(true)
		const res = await fetch('/api/stripe/customer/portal')
		const portal = await res?.json()
		if (portal && !portal?.error) {
			router.push(portal?.url)
		}
		else {
			setCallbackToast({ status: 'error', text: portal?.message ?? 'An error occured when loading Stripe Portal.' })
			setLoadingPortal(false)
		}
	}

	return <>
		{(callbackToast?.status && callbackToast?.text) ? 
			<ShowToast onClick={(e) => setCallbackToast(e)} type={callbackToast?.status} text={callbackToast?.text} />
			: q_errors?.status && <ShowToast onClick={(e) => setCallbackToast(e)} type={q_errors?.status} text={q_errors?.text} />}
		{loadingPortal && <>
			<div style={{ zIndex: 2000 }} className="fixed top-0 right-0 left-0 bottom-0 bg-white opacity-70"></div>
			<div style={{ zIndex: 2001 }} className="fixed top-0 bottom-0 flex items-center justify-center left-0 right-0 w-full">
				<div className="text-center w-full"><Loading text="Loading Stripe Portal" scpace='0 auto' borderWidth={3} width={50} height={50} /></div>
			</div>
		</>}
		<section className="w-full overflow-hidden bg-white dark:bg-black">
			<div className="w-full">
				{!screen?.name ? 
					<>
						<div className="w-full mb-2 text-base md:text-xl">Your Account</div>
						<div className="text-base w-full text-slate-500 dark:text-zinc-400">See information about your account, payments and subscription.</div>
						<div className="mt-8 w-full">
							<Btn 
								title="Account information" 
								description="See your account information like your phone number and email address."
								onClick={() => handleScreenChange({ name: 'account-information', title: 'Account information' })}
								icon={
									<div><svg className="text-slate-500 dark:text-zinc-400 w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19-2 3-3-1-.5-3.5L3 17l-1-3 3-2-3-2 1-3 3.5-.5L7 3l3-1 2 3 2-3 3 1 .5 3.5L21 7l1 3-3 2 3 2-1 3-3.5.5L17 21l-3 1-2-3zm0-3a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path></svg></div>
								} />
							<Btn 
								title="Change your password" 
								description="Change your password at any time."
								onClick={() => handleScreenChange({ name: 'change-password', title: 'Change your password' })}
								icon={
									<div><svg className="text-slate-500 dark:text-zinc-400 w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 13v3h3v3h3v2l2 2h5v-4L12.74 8.74C12.91 8.19 13 7.6 13 7c0-3.31-2.69-6-6-6S1 3.69 1 7a6.005 6.005 0 0 0 8.47 5.47L10 13zM6 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg></div>
								} />
							<Btn 
								title="Payments and subscription" 
								description="See your payments and cancel or change your subscription."
								onClick={loadPortal}
								icon={
									<div><svg className="text-slate-500 dark:text-zinc-400 w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M1 5c0-.552.44-1 1.002-1h19.996A1 1 0 0 1 23 5v14c0 .552-.44 1-1.002 1H2.002A1 1 0 0 1 1 19V5zm0 3h22v2H1V8zm4 7h2v.5H5V15zm5 0h6v.5h-6V15z"></path></svg></div>
								} />
						</div>
					</>
				: 
					<>
						<div className="w-full mb-2 text-base md:text-xl flex items-center gap-8">
							<button onClick={() => handleScreenChange({ name: null, title: null })} className="border-0 ring-0">
								<svg className="w-8 h-8 text-black dark:text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M18 12.4H6M11.4 7 6 12.4l5.4 5.4"></path></svg>
							</button>
							<div>{screen?.title}</div>
						</div>
						<div className="mt-8 w-full">
							{action?.isLoading ? 
							<div className="w-full text-center my-24"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div>
							:
							screen?.name === 'automation' || q_screen === 'automation' ? 
								<>
									<div className="w-full">
										{isCheckingSubscription ? 
											<div className="w-full text-center my-24"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div>
										:
										<>
											<div className="w-full text-base mb-2 md:flex md:items-center md:justify-start md:gap-x-32">
												<div className="w-full shrink">
													<div className="text-xl md text-2xl font-semibold w-full mb-2">
														Link your Twitter account</div>
													<div className="w-full">
														With Insperr AutoTweet, you can easily auto-post to Twitter via our software, 
														by creating new Quotes and streaming your last tweets on the dashboard in real-time.
													</div>
													{isCheckingTwitterAccount ? <div className="mt-4"><Loading text="" scpace='0' borderWidth={2} width={25} height={25} /></div> 
														: isTwitterAccountLinked ? (disconnect ? <div className="mt-4"><Loading text="" scpace='0' borderWidth={2} width={25} height={25} /></div> 
															: <div onClick={() => disconnectTwitterAccount()} className="mt-4 text-sm cursor-pointer text-red-500 inline-block py-1 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:bg-opacity-40 dark:hover:bg-opacity-60 rounded-full">
																Disconnect your Twitter account</div>) : null}
												</div>
												<div className="flex-none pr-0 md:pr-14 md:mt-0 mt-4">
													{isSubscribed ? (isLoading || isCheckingTwitterAccount || connect) ? 
														<div className="w-full my-4"><Loading text="" scpace='0' borderWidth={2} width={25} height={25} /></div>
														:
														isTwitterAccountLinked ? 
															<div className="flex items-center gap-1 text-primary-500">
																<svg className="w-6 h-6" height="25" width="25" fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fillRule="nonzero"/></svg>
																<Tooltip content="Twitter account" placement="bottom">
																	<span className="text-base">Connected</span>
																</Tooltip>
															</div>
														:
															<div className="rounded-full cursor-pointer" onClick={() => connectTwitterAccount()}><BlueButton text="Connect" isLink={false} /></div>
													: <div className="flex items-center gap-2 border-2 border-primary-500 text-primary-500 text-sm uppercase rounded-full py-2 px-4">
														Pro feature <Link href="/pricing" className="hover:text-primary-700"><svg className="w-5 h-5" height="25" width="25" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></Link></div>}
												</div>
											</div>
											<div className="border-t border-slate-100 dark:border-zinc-700 pt-10 mt-10 w-full text-base mb-2 md:flex md:items-center md:justify-start md:gap-x-32">
												<div className="w-full shrink">
													<div className="text-xl md text-2xl font-semibold w-full mb-2">
														Auto post to your Twitter account</div>
													<div className="w-full">
														Do you want to set up auto-tweets for your Twitter account? With Insperr AutoTweet, 
														you can easily auto-post to Twitter via our software, by creating new Quotes and letting us do the job for you. 
														<span className="font-semibold">You need to connect your Twitter account to use this feature</span>!
													</div>
												</div>
												<div className="flex-none pr-0 md:pr-14 md:mt-0 mt-4">
													{isSubscribed ? isCheckingAutoPost ? 
														<div className="w-full my-4"><Loading text="" scpace='0' borderWidth={2} width={25} height={25} /></div>
														:
														<div onClick={() => newRequest()} className={`${automation?.autoPostActive && isTwitterAccountLinked ? 'bg-primary-500' : 'bg-slate-300 dark:bg-zinc-800'} w-14 h-8 cursor-pointer rounded-full relative`}>
															<span className={`${automation?.autoPostActive && isTwitterAccountLinked ? 'translate-x-6' : 'translate-x-0'} transform left-1 bg-white absolute transition duration-200 top-1 h-6 w-6 rounded-full`}></span>
														</div>
													: <div className="flex items-center gap-2 border-2 border-primary-500 text-primary-500 text-sm uppercase rounded-full py-2 px-4">
														Pro feature <Link href="/pricing" className="hover:text-primary-700"><svg className="w-5 h-5" height="25" width="25" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></Link></div>}
												</div>
											</div>
										</>}
									</div>
								</>
							:
							screen?.name === 'account-information' ?
								<>
									<Btn 
										title="Username" 
										description={`@${user?.user_metadata?.username}`} 
										onClick={() => handleScreenChange({ name: 'change-username', title: 'Change your username' })} />
									<Btn 
										title="Full Name" 
										description={user?.user_metadata?.fullname} 
										onClick={() => handleScreenChange({ name: 'automation', title: 'Change your fullname' })} />
									<Btn 
										title="Email" 
										description={user?.email} 
										onClick={() => handleScreenChange({ name: 'change-email', title: 'Change your email address' })} />
									<Btn 
										title="Automation" 
										description="Manage your automated account."
										onClick={() => handleScreenChange({ name: 'automation', title: 'Manage your automated account' })} />
								</>
							: 
							screen?.name === 'change-username' ? 
								<>
									<div className="relative z-0">
										<input onChange={(e) => setAction({ ...action, password: e?.target?.value })} type="password" id="current_password" name="current_password" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" placeholder=" " />
										<label htmlFor="current_password" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Current Password</label>
									</div>
									<div className="mt-4 relative z-0">
										<input onChange={(e) => handleChange({
											name: 'changeUsername',
											params: {
												target: e?.target?.value
											}
										})} type="text" id="username" name="username" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" 
											placeholder=" " defaultValue={user?.user_metadata?.username} />
										<label htmlFor="username" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Username</label>
									</div>
									{error && <div className="mt-3 w-full text-red-500 text-base">{error}</div>}
									<div className="mt-4 text-base">
										<span className="font-semibold">NB:</span> You'll be logged out to set your new username, so make sure you log in again with your new credentials.
									</div>
									<div className="flex w-full mt-4 justify-end">
										<div onClick={() => newRequest()} className={`${error ? 'opacity-40' : 'opacity-100'} rounded-full overflow-hidden cursor-pointer`}>
												<BlueButton isLink={false} text="Save" /></div>
									</div>
								</>
							:
							screen?.name === 'change-fullname' ? 
								<>
									<div className="relative z-0">
										<input onChange={(e) => setAction({ ...action, password: e?.target?.value })} type="password" id="current_password" name="current_password" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" placeholder=" " />
										<label htmlFor="current_password" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Current Password</label>
									</div>
									<div className="mt-4 relative z-0">
										<input onChange={(e) => handleChange({
											name: 'changeFullname',
											params: {
												target: e?.target?.value
											}
										})} type="text" id="fullname" name="fullname" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" 
											placeholder=" " defaultValue={user?.user_metadata?.fullname} />
										<label htmlFor="fullname" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Fullname</label>
									</div>
									{error && <div className="mt-3 w-full text-red-500 text-base">{error}</div>}
									<div className="mt-4 text-base">
										<span className="font-semibold">NB:</span> You'll be logged out to set your new fullname, so make sure you log in again with your new credentials.
									</div>
									<div className="flex w-full mt-4 justify-end">
										<div onClick={() => newRequest()} className={`${error ? 'opacity-40' : 'opacity-100'} rounded-full overflow-hidden cursor-pointer`}>
												<BlueButton isLink={false} text="Save" /></div>
									</div>
								</>
							:
							screen?.name === 'change-email' ? 
								<>
									<div className="relative z-0">
										<input onChange={(e) => setAction({ ...action, password: e?.target?.value })} type="password" id="current_password" name="current_password" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" placeholder=" " />
										<label htmlFor="current_password" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Current Password</label>
									</div>
									<div className="mt-4 relative z-0">
										<input onChange={(e) => handleChange({
											name: 'changeEmail',
											params: {
												target: e?.target?.value
											}
										})} type="email" id="email" name="email" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" 
											placeholder=" " defaultValue={user?.email} />
										<label htmlFor="email" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Email address</label>
									</div>
									{error && <div className="mt-3 w-full text-red-500 text-base">{error}</div>}
									<div className="mt-4 text-base">
										<span className="font-semibold">NB:</span> You'll be logged out to set your new email, so make sure you log in again with your new credentials.
									</div>
									<div className="flex w-full mt-4 justify-end">
										<div onClick={() => newRequest()} className={`${error ? 'opacity-40' : 'opacity-100'} rounded-full overflow-hidden cursor-pointer`}>
											<BlueButton isLink={false} text="Save" /></div>
									</div>
								</>
							:
							screen?.name === 'change-password' &&  
								<>
									<div className="relative z-0">
										<input onChange={(e) => setAction({ ...action, password: e?.target?.value })} type="password" id="current_password" name="current_password" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" placeholder=" " />
										<label htmlFor="current_password" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											Current Password</label>
									</div>
									<div className="mt-4 relative z-0">
										<input onChange={(e) => handleChange({
											name: 'changePassword',
											params: {
												target: e?.target?.value
											}
										})} type="password" id="password" name="password" className="peer block w-full appearance-none border border-slate-300 dark:border-zinc-700 dark:text-zinc-500 rounded-lg bg-transparent pt-6 pb-2.5 px-2 text-slate-900 focus:border-primary-600 focus:outline-none focus:ring-0" placeholder=" " />
										<label htmlFor="password" className="absolute top-6 left-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-slate-500 dark:text-zinc-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-600">
											New Password</label>
									</div>
									{error && <div className="mt-3 w-full text-red-500 text-base">{error}</div>}
									<div className="mt-4 text-base">
										<span className="font-semibold">NB:</span> You'll be logged out to set your new password, so make sure you log in again with your new credentials.
									</div>
									<div className="flex w-full mt-4 justify-end">
										<div onClick={() => newRequest()} className={`${error || !action?.password ? 'opacity-40' : 'opacity-100'} rounded-full overflow-hidden cursor-pointer`}>
											<BlueButton isLink={false} text="Save" /></div>
									</div>
								</>
							}
						</div>
					</>
				}
			</div>
		</section>
	</>;
}

const Btn = ({ title, description, icon=null, onClick=null }) => {
	return <>
		<button onClick={onClick} className="w-full transition duration-200 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl py-5 px-4 flex items-center gap-10">
			{icon && <div className="flex-none">{icon}</div>}
			<div className="shrink w-full text-left">
				<div className="w-full text-base font-semibold">{title}</div>
				<div className="w-full text-sm text-slate-500 dark:text-zinc-400">{description}</div>
			</div>
			{onClick && 
			<div className="flex-none">
				<svg className="w-7 h-7 text-slate-500 dark:text-zinc-400" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m9 6 6 6-6 6"></path></svg>
			</div>}
		</button>
	</>
}

export async function getServerSideProps({ query }) {
	return { props: {
		q_screen: query?.screen ?? null,
		q_errors: {
			status: query?.faild === false ? 'error' : query?.faild === true ? 'success' : null,
			text: query?.faild === false ? 'An unexpected error occured, please try linking your Twitter account again.' 
				: query?.faild === true ? 'Your Twitter account is linked now!' : null,
		},
	}}
}

UserAccount.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default UserAccount