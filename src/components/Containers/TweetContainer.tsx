import { useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Dropdown, Modal, Tooltip } from "flowbite-react"
import { timeAgo, topic } from "@/lib/validation"
import BlueButton from "@/components/BlueButton"
import AvatarContainer from "@/components/Containers/AvatarContainer"

const Loading = dynamic(() => import("@/components/Loading"))


const TweetContainer = ({ user, tweet, id, subscription=null, contentWithLink=true, callback=null, changeTweet=null }) => {

	const router = useRouter()
	const topics = topic(tweet?.topics)

	const [confirm, setConfirm] = useState({ show: false, action: null })
	const [tweeted, setTweeted] = useState(false)
	const [tweeting, setTweeting] = useState(false)
	const [cloning, setCloning] = useState(false)
	const [error, setError] = useState(null)
	const [newTweet, setNewTweet] = useState(null)
	const [modalStatus, setModalStatus] = useState(false)
	const [bookmarksChanges, setBookmarksChanges] = useState({ status: false, id: null })


	const runTask = async (action) => {
		setConfirm({ show: false, action: null })
		if (action === 'retweet' || action === 'tweet') {
			setTweeting(true)
			const data = await fetch(`/api/quote/auth/tweet?quote_id=${tweet?.id}&action=${action}`)
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
			if (tweet?.topics && tweet?.keyword) {
				setCloning(true)
				// Start cloning
				const data = await fetch('/api/ai/new', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						phrase: tweet?.keyword ?? null,
						category: tweet?.topics ?? null,
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

	const updateQuote = async (id) => {
		if (id && newTweet) {
			if (newTweet?.length > 250 || newTweet?.length < 50) {
				setError('The content is too long (maximum is 250 characters and minimum is 50characters)')
			}
			else {
				setModalStatus(false)
				changeTweet(newTweet)
				setError(null)
				// Update quote
				const { error, code } = await fetch(`/api/quote/auth/update`, {
					method: 'POST',
					body: JSON.stringify({
						quote_id: id,
						quote_content: newTweet
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((res) => res.json())
				if (error) callback({ status: code, text: error })
			}
		}
	}

	const addQuote_toBookmarks = async (quote, id) => {
		setBookmarksChanges({ status: true, id })
		if (user) {
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
	}
	
	return <>
		<div className={`w-full p-4 md:p-6 ${tweet?.is_new && 'bg-green-50 dark:bg-zinc-900'} ${contentWithLink ? 'border-b border-slate-200 dark:border-zinc-800' : ''}`}>
			{(!tweet?.tweet_metadata?.tweet_id && !tweeted) && <>
				<div className="flex items-center gap-x-4">
					{tweet?.is_new && 
					<div className="flex-none bg-green-100 cursor-pointer text-green-600 dark:bg-transparent py-1 px-2 rounded-full border border-green-600 text-sm font-semibold inline-block">
						New</div>}
					<div className="w-full shrink flex justify-end">
						<Dropdown className="dark:bg-zinc-700" label="" inline={true}>
							<Dropdown.Item onClick={() => {setModalStatus(true); setError(null); setNewTweet(null)}}>
								Edit
							</Dropdown.Item>
							<Dropdown.Item>
								<div className="cursor-wait opacity-60">Schedule</div>
							</Dropdown.Item>
						</Dropdown>
					</div>
				</div>
				<Modal show={modalStatus} size="xl" popup={true} 
					onClose={() => {setModalStatus(!modalStatus); setError(null); setNewTweet(null)}}>
					<div className="dark:bg-zinc-800 bg-white">
						<Modal.Header />
						<Modal.Body>
							<div className="w-full">
								<div className="w-full flex items-center gap-x-4">
									<div className="flex-none inherit">
										<AvatarContainer avatar={user?.userData?.avatar} width={50} height={50} />
									</div>
									<div className="w-full shrink">
										{user?.userData?.username ? <>
											<div className="w-full text-xl font-semibold flex items-center gap-x-2">
												<Link href={`/user/@${user?.userData?.username}`} className="inline-block">{user?.userData?.fullname}</Link>
												{user?.userData?.is_verified && 
												<Tooltip content="Verified" placement="bottom">
													<svg className="cursor-pointer text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
												</Tooltip>}
											</div>
											<div className="text-base -mt-1 text-slate-600 dark:text-zinc-600 w-full">@{user?.userData?.username}</div>
										</> : <div className="w-40">
												<div className="w-full h-6 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
												<div className="w-10/12 mt-2 h-4 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
											</div> }
									</div>
								</div>
								{error && <div className="w-full text-red-500 text-base mt-4">{error}</div>}
								<div className="w-full inline-block mt-5 text-base md:text-lg font-medium">
									<textarea 
										defaultValue={tweet?.content}
										onChange={(e) => setNewTweet(e?.target?.value)}
										style={{ resize: 'none' }} 
										rows={5} className="focus:ring-0 outline-none w-full p-0 bg-transparent border-0" />
									<div className="w-full mt-2 hidden">
										<button disabled={true} className="cursor-pointer opacity-40 border-0 bg-transparent outline-none focus:ring-0">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
										</button>
									</div>
									<div className="flex justify-end w-full mt-2">
										<div onClick={() => updateQuote(tweet?.id)} className="rounded-full"><BlueButton fullWidth={false} text="Update" isLink={false} /></div>
									</div>
								</div>
							</div>
						</Modal.Body>
					</div>
				</Modal>
			</>}
			<div className={`w-full md:flex md:gap-4 md:items-start ${tweet?.is_new && 'mt-5'}`}>
				<div className="photo hidden md:block flex-none">
					<AvatarContainer avatar={user?.userData?.avatar} width={45} height={45} />
				</div>
				<div className="w-full text-base shrink">
					<div className="w-full flex md:hidden items-center gap-x-4">
						<div className="flex-none inherit">
							<AvatarContainer avatar={user?.userData?.avatar} width={45} height={45} />
						</div>
						<div className="w-full shrink">
							{user?.userData?.username ? <>
								<div className="w-full font-semibold flex items-center gap-x-2">
									<Link href={`/user/@${user?.userData?.username}`} className="inline-block">{user?.userData?.fullname}</Link>
									{user?.userData?.is_verified && 
									<Tooltip content="Verified" placement="bottom">
										<svg className="cursor-pointer text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
									</Tooltip>}
								</div>
								<div className="w-full flex items-center gap-3">
									<div className="text-slate-500 dark:text-zinc-400">@{user?.userData?.username}</div>
									<div className="text-slate-500 dark:text-zinc-400">•</div>
									<div className="text-slate-500 dark:text-zinc-400">{timeAgo(tweet?.created_at)}</div>
								</div>
							</> : <div className="w-40">
									<div className="w-full h-6 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
									<div className="w-10/12 mt-2 h-4 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
								</div> }
						</div>
					</div>
					<div className="w-full hidden md:flex items-center gap-3">
						{user?.userData?.username ? 
						<>
							<div className="font-semibold flex items-center gap-x-2">
								<Link href={`/user/@${user?.userData?.username}`} className="inline-block">{user?.userData?.fullname}</Link>
								{user?.userData?.is_verified && 
									<Tooltip content="Verified" placement="bottom">
										<svg className="cursor-pointer text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
									</Tooltip>}
							</div>
							<div className="text-slate-500 dark:text-zinc-400">@{user?.userData?.username}</div>
							<div className="text-slate-500 dark:text-zinc-400">•</div>
							<div className="text-slate-500 dark:text-zinc-400">{timeAgo(tweet?.created_at)}</div>
						</>
						: <div className="w-full flex items-center gap-x-2">
							<div className="w-20 h-4 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
							<div className="w-14 h-4 rounded-full bg-slate-100 dark:bg-zinc-800"></div>
						</div>}
					</div>
					<div className="w-full mt-2 inline-block">
						{!contentWithLink ? 
							<div className="w-full text-base">{tweet?.content}</div>
						:
							<Link href={`/dashboard/user/status/${tweet?.result_id}`}>
								<div className="w-full text-base">{tweet?.content}</div>
							</Link>}
						{topics && 
							<div className="w-full inline-block mt-1 text-base">
								{topics?.map((tag, i) => {
									return <span key={i} className="tag float-left mr-4 mb-3 text-primary-500 cursor-pointer hover:text-primary-700 transition-all">
										#{tag}</span>
								})}
							</div>}
						<div className="w-full inline-block flex items-center justify-between pr-5">
							{bookmarksChanges?.status && bookmarksChanges?.id === id ? 
								<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
							:
								<Tooltip content="Add to Bookmarks">
									<div onClick={() => addQuote_toBookmarks(tweet, id )}><svg className="cursor-pointer w-5 h-5 text-slate-400 dark:text-zinc-600 hover:text-primary-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M5 1v21l7-5 7 5V1z"></path></svg></div>
								</Tooltip>
							}
							{tweeting ? 
								<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
							:
								<Dropdown className="dark:bg-zinc-700" inline={true} arrowIcon={false} placement="top" label={<svg className="cursor-pointer w-6 h-6 text-slate-400 dark:text-zinc-600 hover:text-primary-500" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z"/></svg>}>
									<Dropdown.Item onClick={() => setConfirm({ show: true, action: 'tweet' })}>
										Tweet
									</Dropdown.Item>
									<Dropdown.Item onClick={() => {tweet?.tweet_metadata?.tweet_id && setConfirm({ show: true, action: 'retweet' })}}>
										<div title={`${(!tweet?.tweet_metadata?.tweet_id && !tweeted) && 'You can\'t retweet untweeted quote!'}`} className={`${(!tweet?.tweet_metadata?.tweet_id && !tweeted) ? 'cursor-wait opacity-60' : ''}`}>Retweet</div>
									</Dropdown.Item>
								</Dropdown>
							}
							{cloning ? 
								<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
							:
								<Tooltip content="Clone">
									<div onClick={() => {
										if (parseInt(user?.generatedQuotes?.toLocaleString(), 10) < subscription?.quotes) {
											setConfirm({ show: true, action: 'clone' })
										}
									}}><svg className={`${parseInt(user?.generatedQuotes?.toLocaleString(), 10) < subscription?.quotes ? 'text-slate-400 dark:text-zinc-600 hover:text-primary-500' : 'text-slate-200 dark:text-zinc-800'} cursor-pointer w-6 h-6`} fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></div>
								</Tooltip>
							}
							<div className="blank"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Modal show={confirm?.show} size="md" popup={true} onClose={() => setConfirm({ show: false, action: null })}>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center w-full">
					<svg className="w-24 h-24 text-slate-200 dark:text-zinc-900 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					<div className="mb-5 text-lg md:text-xl font-normal">
						Are you sure you want to {confirm?.action === 'retweet' ? 'retweet the quote?' : `clone the quote? You still have ${subscription?.quotes - parseInt(user?.generatedQuotes?.toLocaleString(), 10)} quotes remaining.`}
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

export default TweetContainer