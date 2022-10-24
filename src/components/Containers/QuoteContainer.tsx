import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { topic, sluging } from '@/lib/validation'
import AuthorContainer from '@/components/Containers/AuthorContainer'
import Loading from "@/components/Loading"


const QuoteContainer = ({ id, quote, type='custom', withAuthor=true, classes=null, callback, mutate }) => {

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
			mutate(quote?.id)
			callback({ status: result?.status, text: result?.message })
		}
		catch(e) {
			setBookmarksChanges({ status: false, id: null })
		}
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
					{type === 'custom' ? 
						<Link href={`/user/@${quote?.username}`}><a className="inline-block opacity-80">
							<AuthorContainer author={quote?.fullname} /></a></Link>
					: 
						<Link href={`/authors/${sluging(quote?.author_name)}`}><a className="inline-block opacity-80">
							<AuthorContainer author={quote?.author_name} /></a></Link>
					}
				</div>}
				<div className="text-lg md:text-xl w-full content">{quote?.content}</div>
				{topics && 
					<div className="w-full mt-2">
						{topics?.map((topic, i) => {
							if (type === 'custom') {
								return <div key={i} className="inline-block text-primary-500 float-left mr-3 mb-1 text-sm">{topic?.toUpperCase()}</div>
							} 
							else {
								return <Link key={i} href={`topics/${topic?.toLowerCase()}`}>
									<a className="inline-block text-primary-500 float-left mr-3 mb-1 text-sm">{topic?.toUpperCase()}</a></Link>
							}
						})}
					</div>}
			</div>
		</div>
	</>
}

export default QuoteContainer