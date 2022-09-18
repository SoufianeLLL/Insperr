import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import Authors from "@/utils/authors.json"
import { capitalizer } from "@/lib/validation"
import { searchForAuthors } from "@/lib/global"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import AuthorDiv from "@/components/AuthorDiv"
import Loading from "@/components/Loading"


export const getStaticProps: GetStaticProps<{}> = async () => {
	return {
		props: { quotes: [] },
	}
}


const IndexPage = () => {

	const [profiles, setAuthors] = useState(null)
	const [profilesBySearch, setAuthorsFromSearch] = useState(null)
	const [author, setAuthor] = useState({ name: null, quotes: null })

	useEffect(() => {
		if (!author?.name && !profilesBySearch) {
			const n = 12
			const timer = setTimeout(() => setAuthors(Authors
				.map(x => ({ x, r: Math.random() }))
				.sort((a, b) => a.r - b.r)
				.map(a => a.x)
				.slice(0, n)), 4000)
			return () => clearTimeout(timer)
		}
	}, [profiles])

	return <>
		{author?.name ? 
		<section className="w-full mt-14">
			<div className="text-2xl w-full text-center text-zinc-200">————————</div>
			<h4 className="text-3xl md text-5xl w-full text-center mb-2 fontSemiBold">{capitalizer(author?.name)}</h4>
			<div className="w-full px-10 2xl:px-0 max-w-7xl overflow-hidden mx-auto">
				{author?.name && !author?.quotes ? 
				<div className="w-full text-center my-20 text-base"><Loading text="please wait a few minutes while the quotes is generated." width={50} height={50} /></div>
				: '...' }
			</div>
		</section>
		: 
		<>
			<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
				<div className="search-section relative w-full mx-auto max-w-2xl mt-20">
					<h2 className="fontInter w-full mb-3 text-center text-2xl md:text-3xl fontSemiBold">Who said it</h2>
					<input onChange={async (e) => setAuthorsFromSearch(await searchForAuthors(e, Authors))}  type="text" className="text-center  w-full py-4 px-7 rounded-full text-xl border-2 border-zinc-300 dark:border-zinc-600 placeholder-zinc-300 outline-none focus:ring-none bg-white pr-14" placeholder="e.g. Steve Jobs, Elon Musk ..." />
				</div>
				<div className="w-full mt-8">
					{!profilesBySearch ? '' : profilesBySearch?.error ?
						<div className="text-base mt-10 w-full text-center">{profilesBySearch?.error}</div>
					:
					<div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-base">
						{profilesBySearch?.length && profilesBySearch?.map((author) => {
							return <AuthorDiv key={author?.authorID} onClick={() => setAuthor({ name: author?.name?.toLowerCase(), quotes: null })} 
							author={author?.name} classes={{ 
								more: 'border-white', 
								bgColor: 'bg-zinc-100', 
								shadow: false 
							}} />
						})}
					</div>}
				</div>
			</section>
			{!profilesBySearch &&
			<>
				<section className="w-full bg-zinc-100 mt-14 overflow-hidden">
					<div className="w-full px-10 2xl:px-0 max-w-7xl overflow-hidden mx-auto">
						<div className="w-full my-12 text-base overflow-hidden">
							<div className="heading w-full">
								<div className="text-xl md:text-2xl font-semibold w-full">Popular Authors</div>
							</div>
							<div className="mt-6 w-full flex items-center overflow-x-scroll authors-scroll p-2 gap-4">
								{(profiles && profiles?.length) ? profiles?.map((author) => {
									return <AuthorDiv key={author?.authorID} 
										onClick={() => setAuthor({ name: author?.name?.toLowerCase(), quotes: null })} 
										author={author?.name} classes={{
											more: 'border-white', 
											bgColor: 'bg-white', 
											shadow: true 
										}} />
								}) 
								: <div className="flex-none"><Loading scpace="0" borderWidth={3} text="null" width={35} height={35} /></div>}
								<Link href="/authors"><a className="bg-white rounded-full py-2 pl-2 pr-4 shadow flex items-center gap-2 flex-none">
									<span className="flex-none bg-white rounded-full h-8 w-0"></span>
									<span className="flex-none">More authors</span>
								</a></Link>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
					<div className="w-full my-20 overflow-hidden">
						<div className="heading w-full">
							<div className="text-xl md:text-2xl font-semibold w-full">Trending</div>
						</div>
						<div className="mt-8 w-full grid grid-cols-3 gap-6">
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
							<div className="bg-zinc-100 h-60 rounded-md"></div>
						</div>
					</div>
				</section>
			</>}
		</>}
	</>
}

IndexPage.getLayout = (page) => <UnauthenticatedLayout home={true}>{page}</UnauthenticatedLayout>

export default IndexPage