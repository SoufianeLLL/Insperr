import { useEffect, useState } from "react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import AuthorContainer from "@/components/Containers/AuthorContainer"
import Loading from "@/components/Loading"
import { searchForAuthors } from "@/lib/global"
import useSWR, { useSWRConfig } from "swr"


const GenerateQuotesPage = () => {

	// Get Topics list
	const { cache } = useSWRConfig()
	let TopicsURI = `/api/topic`, Topics = cache.get(TopicsURI) ?? useSWR(TopicsURI)?.data

	const [loading, setLoading] = useState({ isLoading: false, text: null })
	const [target, setTarget] = useState({ 
		phrase: null,
		category: null,
		engine: 'custom', 
		characters: 150,
		quota: 1 
	})
	
	const startGenerating = async () => {
		if (!loading?.isLoading && target?.category && target?.phrase) {
			setLoading({
				isLoading: true,
				text: "Please sit tight, we will start generating your quotes in the next few seconds. D'ont close this window!"
			})
			// Start generating
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					phrase: target?.phrase ?? null,
					category: target?.category ?? null,
					engine: target?.engine ?? 'custom', 
					characters: target?.characters ?? 150,
					quota: target?.quota ?? 1 
				})
			})
			.then((res) => { return res?.json() })
			.catch((e) => console.log(e))
			console.log(res)
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

	const changeCharacters = (action) => {
		if (action === 'increase') {
			setTarget({ ...target, characters: target?.characters + 10 })
		}
		else if (action === 'decrease') {
			setTarget({ ...target, characters: target?.characters > 50 ? target?.characters - 10 : 50 })
		}
	}

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
							<div className="search-col w-full">
								<div className="w-full text-slate-400 mb-2 text-base">Start type something</div>
								<input onChange={async (e) => setTarget({ ...target, phrase: e?.target?.value })} 
								className="w-full outline-none border-0 bg-white rounded-lg p-4 text-center" 
								placeholder="i.e Love is" type="text" name="custom-word" />
							</div>
							<div className="mt-8 category-col w-full">
								<div className="w-full text-slate-400 text-base mb-2">Select topic:</div>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 text-base">
									{Topics?.map ((topic, i) => {
										return <div key={i} onClick={() => setTarget({ ...target, category: topic?.name?.toLowerCase() })} className={`${target?.category?.toLowerCase() === topic?.name?.toLowerCase() ? 'text-primary-500 font-semibold' : ''} cursor-pointer transition duration-200 hover:underline`}>{topic?.name}</div>
									})}
								</div>
							</div>
						</div>
						<div className="flex-none md:w-1/3 w-full md:mt-0 mt-10">
							<div className="w-full flex items-center gap-3">
								<div onClick={() => changeCharacters('decrease')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">-</div>
								<div className="w-full shrink flex justify-center items-center">
									<input onChange={(e) => setTarget({ ...target, characters: parseInt(e.target.value) >= 50 ? parseInt(e.target.value) : 50 })} 
									size={target?.characters?.toString()?.length} type="text" min={1} className="border-0 inline-block w-auto outline-none bg-slate-100 py-2 text-center" value={target?.characters} defaultValue={target?.characters} /> 
									<div className="">Chars</div>
								</div>
								<div onClick={() => changeCharacters('increase')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">+</div>
							</div>
							<div className="w-full flex items-center gap-3 mt-8">
								<div onClick={() => changeQuota('decrease')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">-</div>
								<div className="w-full shrink flex justify-center items-center">
									<input onChange={(e) => setTarget({ ...target, quota: parseInt(e.target.value) >= 1 ? parseInt(e.target.value) : 1 })} 
									size={target?.quota?.toString()?.length} type="text" min={1} className="border-0 inline-block w-auto outline-none bg-slate-100 py-2 text-center" value={target?.quota} defaultValue={target?.quota} /> 
									<div className="">{target?.quota <= 1 ? 'Quote' : 'Quotes'}</div>
								</div>
								<div onClick={() => changeQuota('increase')} className="flex-none text-3xl bg-white py-3 px-5 cursor-pointer rounded-lg">+</div>
							</div>
							<div onClick={() => (target?.category && target?.phrase) && startGenerating()} className={`${target?.category && target?.phrase ? 'bg-primary-500 text-white hover:bg-primary-700' : 'bg-slate-300 text-white'} w-full cursor-pointer transition duration-200 py-3 px-4 text-center rounded-lg mt-4`}>
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