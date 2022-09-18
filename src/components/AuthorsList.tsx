import { useState } from 'react'
import Link from 'next/link'
import Authors from '@/utils/authors.json'
import { authorsListWithAlphabet } from '@/lib/validation'


let authorsList = authorsListWithAlphabet(Authors)

const AuthorList = () => {

	const [clipboard, setClipboard] = useState(null)

	const copy = (name) => {
		setClipboard(name)
		navigator.clipboard.writeText(name)
		const timer = setTimeout(() => {
			setClipboard(null)
		}, 5000)
		return () => clearTimeout(timer)
	}

	return <>
		<div className="w-full mt-12 authors-list">
			{clipboard && <div style={{ zIndex: 1000 }} className="fixed bottom-5 bg-black rounded-xl overflow-hidden flex items-center px-1.5 py-2 text-white text-base left-5">
				<span className="bg-primary-500 rounded-lg py-2 px-3">Copied</span>
				<span className="px-4">{clipboard}</span>
			</div>}
			<div className="w-full">
				<div className="w-full text-center">
					{authorsList?.map((data, i) => {
						return <Link href={`#${data?.key?.toLocaleLowerCase()}`}><a key={i} className="inline w-full transition duration-200 hover:bg-primary-50 hover:text-primary-500 font-semibold transform hover:scale-125 scale-100 cursor-pointer py-2 px-3 rounded-lg mb-3 text-base">{data?.key?.toUpperCase()}</a></Link>
					})}
				</div>
				<div className="mt-10 w-full">
					{authorsList?.map((data, i) => {
						return <div id={data?.key?.toLocaleLowerCase()} className={`w-full ${i !== 0 && 'border-t border-zinc-200'} my-5 list-of-authors-started-with ${data?.key?.toLowerCase()}`}>
							<div className="letter text-4xl md:text-5xl my-5 fontBold">{data?.key?.toUpperCase()}</div>
							<div key={data?.key} className="w-full text-zinc-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-6">
								{(data?.list && data?.list?.length > 0) && data?.list?.map((author) => {
									return <div onClick={() => copy(author?.name)} className="w-full mb-2 cursor-pointer hover:text-black text-base">{author?.name}</div>
								})}
							</div>
						</div>
					})}
				</div>
			</div>
		</div>
	</>
}

export default AuthorList