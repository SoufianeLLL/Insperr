import { useEffect, useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Dropdown, Modal, Tooltip } from "flowbite-react"
import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { topic } from '@/lib/validation'
import { Settings } from "@/utils/settings"
import AvatarContainer from "@/components/Containers/AvatarContainer"
import BlueButton from "@/components/BlueButton"

const Loading = dynamic(() => import("@/components/Loading"))


const QuoteContainer = ({ id, quote, callback=null, mutate=null }) => {

	const user = useUser()
	const router = useRouter()
	const { isLoading: isUserLoading } = useSessionContext()

	const topics = topic(quote?.topics)
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)

	const [subs, setSubs] = useState(null)
	const [tweeted, setTweeted] = useState(false)
	const [tweeting, setTweeting] = useState(false)
	const [cloning, setCloning] = useState(false)
	const [confirm, setConfirm] = useState({ show: false, action: null })
	const [bookmarksChanges, setBookmarksChanges] = useState({ status: false, id: null })


	useEffect(() => {
		if (isCheckingSubscription && !subs) {
			let filter
			if (userData?.subscription)
				filter = Settings?.products.find((itm) => { return userData?.subscription?.product_id === itm.id })
			else 
				filter = Settings?.products.find((itm) => { return (itm.id)?.toLowerCase() === 'free' })

			setSubs({
				name: filter?.name,
				quotes: filter?.quotes,
				autoPost: filter?.autoPost,
				priority_support: filter?.priority_support,
				inProgress: {
					api: filter?.api,
					requests: filter?.requests
				}
			})
		}
	}, [subs])


	const runTask = async (action) => {
		setConfirm({ show: false, action: null })
		if (action === 'retweet' || action === 'tweet') {
			setTweeting(true)
			const data = await fetch(`/api/quote/auth/tweet?quote_id=${quote?.id}&action=${action}`)
			const res = await data?.json()
			if (res?.error) {
				callback({ status: 'error', text: res?.message })
			}
			else {
				if (action === 'tweet') {
					setTweeted(true)
				}
				callback({ status: 'success', text: `Quote has been ${action}ed successfully!` })
			}
			setTweeting(false)
		}
		else if (action === 'clone') {
			if (quote?.topics && quote?.keyword) {
				setCloning(true)
				// Start cloning
				const data = await fetch('/api/ai/new', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						phrase: quote?.keyword ?? null,
						category: quote?.topics ?? null,
						characters: 250,
					})
				})
				const res = await data?.json()
				if (res) {
					if (res?.status) {
						callback({ status: 'error', text: res?.message })
					}
					else if(res?.resultId) {
						// Redirect after quote created
						router?.push(`/dashboard/user/status/${res?.resultId}`)
					}
				}
				else {
					callback({ status: 'error', text: 'There was an error during the process please contact the admin.' })
				}
				setTweeting(false)
			}
		}
	}

	const addQuote_toBookmarks = async (quote, id) => {
		setBookmarksChanges({ status: true, id })
		try {
			const result = await fetch(`/api/saves?action=Insert&quote_id=${quote?.id}`)
				.then((res) => res.json())

			setBookmarksChanges({ status: false, id: null })
			callback({ status: result?.status, text: result?.message })
		}
		catch(e) {
			setBookmarksChanges({ status: false, id: null })
		}
	}

	const removeQuote_fromBookmarks = async (quote, id) => {
		setBookmarksChanges({ status: true, id })
		try {
			const result = await fetch(`/api/saves?action=Delete&quote_id=${quote?.id}`)
				.then((res) => res.json())

			setBookmarksChanges({ status: false, id: null })
			if (mutate) mutate(quote?.id)
			callback({ status: result?.status, text: result?.message })
		}
		catch(e) {
			setBookmarksChanges({ status: false, id: null })
		}
	}
	
	return <>
		<div className={`quote_${quote?.id} inline-block mb-7 w-full max-w-2xl rounded-2xl shadow hover:shadow-lg border border-slate-100 p-5 md:p-8 dark:bg-zinc-900 dark:border-zinc-900 bg-white`}>
			<div className="w-full">
				<div className="w-full flex items-center gap-x-4">
					<div className="flex-none inherit">
						<AvatarContainer avatar={quote?.avatar} width={50} height={50} />
					</div>
					<div className="w-full shrink">
						{quote?.username ? <>
							<div className="w-full text-xl font-semibold flex items-center gap-x-2">
								<Link href={`/user/@${quote?.username}`} className="inline-block">{quote?.fullname}</Link>
								{quote?.is_verified && 
								<Tooltip content="Verified" placement="bottom">
									<svg className="cursor-pointer text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
								</Tooltip>}
							</div>
							<div className="text-base -mt-1 text-slate-600 dark:text-zinc-600 w-full">@{quote?.username}</div>
						</> : <div className="w-40">
								<div className="w-full h-6 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
								<div className="w-10/12 mt-2 h-4 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
							</div> }
					</div>
				</div>
				<div className="w-full inline-block mt-3 text-base md:text-lg font-medium">{quote?.content}</div>
				{topics && 
					<div className="w-full inline-block mt-1 text-base md:text-lg">
						{topics?.map((tag, i) => {
							return <span key={i} className="tag float-left mr-4 mb-3 text-primary-500 cursor-pointer hover:text-primary-700 transition-all">
								#{tag}</span>
						})}
					</div>}
				<div className="w-full inline-block mt-3 flex items-center justify-between pr-5">
					{bookmarksChanges?.status && bookmarksChanges?.id === id ? 
						<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
					:
						((router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/bookmarks') ? 
						<Tooltip content="Remove to Bookmarks">
							<div onClick={() => removeQuote_fromBookmarks(quote, id )}><svg className="cursor-pointer w-5 h-5 text-slate-400 dark:text-zinc-600 hover:text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m3 3 18 18M3 21 21 3"></path></svg></div>
						</Tooltip>
						:
						<Tooltip content="Add to Bookmarks">
							<div onClick={() => {
								if (!isUserLoading && !user) router.push('/access')
								else {
									addQuote_toBookmarks(quote, id )
								}
							}}><svg className="cursor-pointer w-5 h-5 text-slate-400 dark:text-zinc-600 hover:text-primary-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M5 1v21l7-5 7 5V1z"></path></svg></div>
						</Tooltip>
					}
					{tweeting ? 
						<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
					:
						<Dropdown className="dark:bg-zinc-700" inline={true} arrowIcon={false} placement="top" label={<svg className="cursor-pointer w-6 h-6 text-slate-400 dark:text-zinc-600 hover:text-primary-500" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z"/></svg>}>
							<Dropdown.Item onClick={() => setConfirm({ show: true, action: 'tweet' })}>
								Tweet
							</Dropdown.Item>
							<Dropdown.Item onClick={() => {
								if (!isUserLoading && !user) router.push('/access')
								else if (quote?.tweet_metadata?.tweet_id) {
									setConfirm({ show: true, action: 'retweet' })
								}
							}}>
								<div title={`${(!quote?.tweet_metadata?.tweet_id && !tweeted) && 'You can\'t retweet untweeted quote!'}`} className={`${(!quote?.tweet_metadata?.tweet_id && !tweeted) ? 'cursor-wait opacity-60' : ''}`}>Retweet</div>
							</Dropdown.Item>
						</Dropdown>
					}
					{cloning ? 
						<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
					:
						<Tooltip content="Clone">
							<div onClick={() => {
								if (!isUserLoading && !user) router.push('/access')
								else if (parseInt(userData?.generatedQuotes?.toLocaleString(), 10) < subs?.quotes) {
									setConfirm({ show: true, action: 'clone' })
								}
							}}><svg className={`${parseInt(userData?.generatedQuotes?.toLocaleString(), 10) < subs?.quotes ? 'text-slate-400 dark:text-zinc-600 hover:text-primary-500' : 'text-slate-200 dark:text-zinc-800'} cursor-pointer w-6 h-6`} fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div>
						</Tooltip>
					}
					<div className="blank"></div>
				</div>
			</div>
		</div>
		<Modal show={confirm?.show} size="md" popup={true} onClose={() => setConfirm({ show: false, action: null })}>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center w-full">
					<svg className="w-24 h-24 text-slate-200 dark:text-zinc-900 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					<div className="mb-5 text-lg md:text-xl font-normal">
						Are you sure you want to {confirm?.action === 'retweet' ? 'retweet the quote?' : `clone the quote? You still have ${subs?.quotes - parseInt(userData?.generatedQuotes?.toLocaleString(), 10)} quotes remaining.`}
					</div>
					<div className="flex justify-center">
						<div onClick={() => runTask(confirm?.action)} className="rounded-full">
							<BlueButton fullWidth={false} text="Yes, I'm sure" isLink={false} /></div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	</>
}

export default QuoteContainer