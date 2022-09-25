import Link from "next/link"
import { topic, sluging } from '@/lib/validation'
import AuthorContainer from '@/components/Containers/AuthorContainer'


const QuoteContainer = ({ quote, classes=null }) => {

	const topics = topic(quote?.topics)

	return <>
		<div className={`${classes} bg-zinc-100 p-5 md:p-8 w-full rounded-lg relative overflow-hidden mb-6`}>
			<svg style={{ zIndex: 0 }} className="absolute top-0 left-2 text-zinc-200 opacity-60" fill="currentColor" width="70" height="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
			<div style={{ zIndex: 2 }} className="save text-zinc-300 cursor-pointer hover:text-primary-500 absolute top-2 right-2 py-2 px-2"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M19 24l-7-6-7 6v-24h14v24z"/></svg></div>
			<div style={{ zIndex: 1 }} className="w-full relative">
				<div className="mb-2 w-full text-base">
					<Link href={`authors/${sluging(quote?.author_name)}`}><a className="inline-block opacity-80">
						<AuthorContainer author={quote?.author_name} /></a></Link>
				</div>
				<div className="text-lg md:text-xl w-full fontRobotoNormal">{quote?.content}</div>
				{topics && 
					<div className="w-full mt-2">
						{topics?.map((topic, i) => {
							return <Link key={i} href={`topics/${topic?.toLowerCase()}`}>
								<a className="inline-block text-primary-600 float-left mr-3 mb-1 text-sm">{topic?.toUpperCase()}</a></Link>
						})}
					</div>}
			</div>
		</div>
	</>
}

export default QuoteContainer