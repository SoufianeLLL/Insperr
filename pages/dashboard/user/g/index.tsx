import { useEffect, useState } from "react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import Topics from "@/utils/topics.json"
import Authors from "@/utils/authors.json"
import AuthorDiv from "@/components/AuthorDiv"
import Loading from "@/components/Loading"
import { searchForAuthors } from "@/lib/global"


const GenerateQuotesPage = () => {

	const [loading, setLoading] = useState({ isLoading: false, text: null })
	const [profiles, setAuthors] = useState(null)
	const [target, setTarget] = useState({ 
		phrase: null, // optional - only on Custom engine
		category: null,
		author: null, 
		engine: 'database', 
		quota: 1 
	})
	
	const startGenerating = () => {
		if (!loading?.isLoading && target?.category && target?.author) {
			setLoading({
				isLoading: true,
				text: "Please sit tight, we will start generating your quotes in the next few seconds. D'ont close this window!"
			})
			// 
		}
	}

	const changeQuota = (action) => {
		if (action === 'increase') {
			setTarget({ ...target, quota: target?.quota + 1 })
		}
		else if (action === 'decrease') {
			setTarget({ ...target, quota: target?.quota > 1 ? target?.quota - 1 : 1 })
		}
	}

	useEffect(() => {
		if (!target?.author && !profiles) {
			const n = 21
			const timer = setTimeout(() => setAuthors(Authors
				.map(x => ({ x, r: Math.random() }))
				.sort((a, b) => a.r - b.r)
				.map(a => a.x)
				.slice(0, n)), 5000)
			return () => clearTimeout(timer)
		}
	}, [profiles])

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-5 overflow-hidden">
				{loading?.isLoading ? <div className="w-full max-w-sm h-screen mx-auto text-center">
					<Loading text={loading?.text ?? null} width={50} height={50} /></div>
				:
				<>
					<div className="heading w-full">
						<div className="text-xl md:text-2xl font-semibold w-full">Generate new Quotes</div>
					</div>
					<div className="w-full md:flex md:items-start md:gap-5 mt-5">
						<div className="shrink w-full bg-white p-5 rounded-xl">
							<div className="quote-engine-col w-full">
								<div className="w-full text-zinc-400 mb-2 text-base">The engine?</div>
								<div className="flex gap-6 items-center text-base">
									<span onClick={() => setTarget({ ...target, engine: 'database' })} 
										className={`${target?.engine?.toLocaleLowerCase() === 'database' ? 'text-primary-500 border-primary-500' : 'border-white bg-zinc-100 text-black'} cursor-pointer border-2 rounded-full px-4 py-2`}>Real Quotes</span>
									<span onClick={() => setTarget({ ...target, engine: 'custom-ai' })} 
										className={`${target?.engine?.toLocaleLowerCase() === 'custom-ai' ? 'text-primary-500 border-primary-500' : 'border-white bg-zinc-100 text-black'} cursor-pointer border-2 rounded-full px-4 py-2`}>Custome Quotes (made with AI)</span>
								</div>
							</div>
							{target?.engine?.toLocaleLowerCase() === 'database' ? 
								<div className="mt-8 search-col w-full">
									<div className="w-full text-zinc-400 mb-2 text-base">Who said it?</div>
									<input onChange={async (e) => setAuthors(await searchForAuthors(e, Authors))} 
									className="w-full outline-none border-0 bg-transparent rounded-lg p-4 text-center" 
									placeholder="i.e Donald Trump" type="text" name="who-said-it" />
									<div className="w-full mt-5">
										{!profiles ? <div className="mt-10"><Loading text="null" width={50} height={50} /></div>
										:
										profiles?.error ?
											<div className="text-base mt-10 w-full text-center">{profiles?.error}</div>
										:
										<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 text-base">
											{profiles?.length && profiles?.map((author) => {
												return <AuthorDiv key={author?.authorID} onClick={() => setTarget({ ...target, author: author?.name?.toLowerCase() })} 
												author={author?.name} classes={{ 
													more: `${target?.author?.toLowerCase() === author?.name?.toLowerCase() ? 'text-primary-500 border-primary-500' : 'border-white'}`, 
													bgColor: target?.author?.toLowerCase() !== author?.name?.toLowerCase() && 'bg-zinc-100', 
													shadow: false 
												}} />
											})}
										</div>}
									</div>
								</div>
							:
								<div className="mt-8 search-col w-full">
									<div className="w-full text-zinc-400 mb-2 text-base">Type a custom phrase?</div>
									<input onChange={async (e) => setTarget({ ...target, phrase: e?.target?.value })} 
									className="w-full outline-none border-0 bg-transparent rounded-lg p-4 text-center" 
									placeholder="i.e Love is" type="text" name="custom-word" />
								</div>}
						</div>
						<div className="flex-none md:w-1/3 w-full md:mt-0 mt-10">
							<div className="shrink w-full bg-white p-5 rounded-xl">
								<div className="category-col w-full">
									<div className="w-full text-zinc-400 text-base mb-2">Select topic:</div>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 text-base">
										{Topics?.map ((topic) => {
											return <div onClick={() => setTarget({ ...target, category: topic?.name?.toLowerCase() })} className={`${target?.category?.toLowerCase() === topic?.name?.toLowerCase() ? 'text-primary-500 font-semibold' : ''} cursor-pointer transition duration-200 hover:underline`}>{topic?.name}</div>
										})}
									</div>
								</div>
							</div>
							<div className="w-full flex items-center gap-3 mt-7">
								<div onClick={() => changeQuota('decrease')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">-</div>
								<div className="w-full shrink flex justify-center items-center">
									<input onChange={(e) => setTarget({ ...target, quota: parseInt(e.target.value) >= 1 ? parseInt(e.target.value) : 1 })} 
									size={target?.quota?.toString()?.length} type="text" min={1} className="border-0 inline-block w-auto outline-none bg-zinc-100 py-2 text-center" value={target?.quota} defaultValue={target?.quota} /> 
									<div className="">{target?.quota <= 1 ? 'Quote' : 'Quotes'}</div>
								</div>
								<div onClick={() => changeQuota('increase')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">+</div>
							</div>
							<div onClick={() => (target?.category && target?.author) && startGenerating()} className={`${target?.category && target?.author ? 'bg-primary-500 text-white hover:bg-primary-700' : 'bg-zinc-300 text-white'} w-full cursor-pointer transition duration-200 py-3 px-4 text-center rounded-full mt-4`}>
								Start Generating!</div>
						</div>
					</div>
				</>}
			</div>
		</section>
	</>
}

GenerateQuotesPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default GenerateQuotesPage