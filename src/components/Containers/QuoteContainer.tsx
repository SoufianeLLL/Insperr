import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { topic, sluging } from '@/lib/validation'
import AuthorContainer from '@/components/Containers/AuthorContainer'
import Loading from "@/components/Loading"


const QuoteContainer = ({ id, quote, type='custom', withAuthor=true, classes=null, callback=null, mutate=null }) => {

	const router = useRouter()
	const { isLoading } = useSessionContext()
	const user = useUser()
	const [bookmarksChanges, setBookmarksChanges] = useState({ status: false, id: null })

	const topics = topic(quote?.topics)

	const addQuote_toBookmarks = async (quote, id) => {
		setBookmarksChanges({ status: true, id })
		if (!isLoading) {
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
			else {
				alert('Login')
				setBookmarksChanges({ status: false, id: null })
			}
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
	
	if (type === 'custom') {
		return <div className={`quote_${quote?.id} inline-block mb-7 w-full max-w-2xl rounded-2xl shadow hover:shadow-lg border border-slate-100 bg-zinc-100 p-5 md:p-8 bg-white`}>
			<div className="w-full">
				<div className="w-full flex items-center gap-x-4">
					<div className="flex-none inherit">
						{quote?.avatar ? 
							<Image 
								className="inline-block rounded-full"
								src={quote?.avatar}
								blurDataURL={require('../../../public/images/avatar.jpg')} 
								placeholder="blur"
								unoptimized={true} 
								height={50}
								width={50} />
						:
							<Image 
								className="inline-block rounded-full"
								src={require('../../../public/images/avatar.jpg')} 
								placeholder="blur"
								unoptimized={true} 
								height={50}
								width={50} />
							}
					</div>
					<div className="w-full shrink">
						<div className="w-full text-xl font-semibold flex items-center gap-x-2">
							<Link href={`/user/@${quote?.username}`}><a className="inline-block">{quote?.fullname}</a></Link>
							<svg className="text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z"/></svg>
						</div>
						<div className="text-base -mt-1 text-slate-600 w-full">@{quote?.username}</div>
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
				<div className="w-full inline-block mt-3 flex items-center gap-x-12">
					{bookmarksChanges?.status && bookmarksChanges?.id === id ? 
						<div><Loading text="null" width={20} height={20} borderWidth={2} scpace="0" /></div>
					:
						((router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/bookmarks') ? 
						<div onClick={() => removeQuote_fromBookmarks(quote, id )}><svg className="cursor-pointer w-5 h-5 text-slate-400 hover:text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m3 3 18 18M3 21 21 3"></path></svg></div>
						:
						<div onClick={() => addQuote_toBookmarks(quote, id )}><svg className="cursor-pointer w-5 h-5 text-slate-400 hover:text-primary-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M5 1v21l7-5 7 5V1z"></path></svg></div>
					}
					<div data-tooltip-target={`share quote_${id}`}><svg className="cursor-pointer w-5 h-5 text-slate-400 hover:text-primary-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-2-4-8-5m8-7-8 5"></path></svg></div>
					<div id={`share quote_${id}`} role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
						Share on Twitter <div className="tooltip-arrow" data-popper-arrow></div></div>
				</div>
			</div>
		</div>
	}


	return <>
		<div className={`${classes} quote_${quote?.id} p-quote bg-white shadow hover:shadow-lg border border-slate-100 p-5 md:p-8 w-full rounded-lg relative overflow-hidden mb-6 transition duration-200`}>
			<svg style={{ zIndex: 0 }} className="absolute top-0 left-2 text-slate-100" fill="currentColor" width="70" height="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
			{bookmarksChanges?.status && bookmarksChanges?.id === id ? 
				<div className="absolute top-2 right-2 py-2 px-2"><Loading text="" width={20} height={20} borderWidth={2} scpace="0" /></div>
			:
				((router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/bookmarks') ? 
				<div onClick={() => removeQuote_fromBookmarks(quote, id )} style={{ zIndex: 2 }} className="save text-slate-200 cursor-pointer hover:text-primary-500 absolute top-2 right-2 py-2 px-2"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m3 3 18 18M3 21 21 3"></path></svg></div>
				:
				<div onClick={() => addQuote_toBookmarks(quote, id )} style={{ zIndex: 2 }} className="save text-slate-200 cursor-pointer hover:text-primary-500 absolute top-2 right-2 py-2 px-2"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M19 24l-7-6-7 6v-24h14v24z"/></svg></div>
			}
			<div style={{ zIndex: 1 }} className="w-full relative">
				{withAuthor &&
				<div className="mb-2 w-full text-base">
					<Link href={`/authors/${sluging(quote?.author_name)}`}><a className="inline-block opacity-80">
						<AuthorContainer author={quote?.author_name} /></a></Link>
				</div>}
				<div className="text-lg md:text-xl w-full font-medium">{quote?.content}</div>
				{topics && 
					<div className="w-full mt-2">
						{topics?.map((topic, i) => {
							return <Link key={i} href={`topics/${topic?.toLowerCase()}`}>
								<a className="inline-block text-primary-500 float-left mr-3 mb-1 text-sm">#{topic?.toUpperCase()}</a></Link>
						})}
					</div>}
			</div>
		</div>
	</>
}

export default QuoteContainer