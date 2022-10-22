import useSWR, { useSWRConfig } from "swr"
import { useEffect, useState } from "react"
import { Settings } from "@/utils/settings"
import Loading from "@/components/Loading"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const GenerateQuotesPage = () => {

	// Get Topics list
	const { cache } = useSWRConfig()
	let TopicsURI = `/api/topic`, Topics = cache.get(TopicsURI) ?? useSWR(TopicsURI)?.data

	const [loading, setLoading] = useState({ isLoading: false, text: null })
	const [target, setTarget] = useState({ 
		phrase: null,
		category: null,
		engine: 'custom', 
		characters: 250,
		quota: 1 
	})

	useEffect(() => {
		document.body.classList.remove("bg-slate-100")
		return () => document.body.classList.add("bg-slate-100")
	}, [])
	
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
					characters: target?.characters ?? 250,
					quota: target?.quota ?? 1 
				})
			})
			.then((res) => { return res?.json() })
			.catch((e) => console.log(e))
			console.log(res)
		}
	}

	return <>
		<section className="w-full 2xl:px-0 max-w-7xl">
			<div className="w-full pb-3 overflow-hidden">
				{loading?.isLoading ? <div className="w-full max-w-sm h-screen mx-auto text-center">
					<Loading text={loading?.text ?? null} width={50} height={50} /></div>
				:
				<>
					<div className="heading w-full">
						<div className="text-xl md:text-2xl font-semibold w-full">Generate new Quotes</div>
					</div>
					<div className="w-full lg:flex lg:items-start lg:gap-12 mt-5">
						<div className="shrink w-full rounded-xl">
							<div className="search-col w-full">
								<div className="w-full font-somibold mb-2 text-base">Type something to start with</div>
								<input onChange={async (e) => setTarget({ ...target, phrase: e?.target?.value })} 
								className="w-full outline-none border-slate-200 focus:border-primary-500 focus:border-b-2 border-b-2 py-2 w-full bg-white placeholder-slate-400 text-left" 
								placeholder="i.e Love is" type="text" name="custom-word" />
							</div>
							<div className="mt-8 category-col w-full">
								<div className="w-full font-somibold text-base mb-2">Select topic:</div>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 text-base">
									{Topics?.map ((topic, i) => {
										return <div key={i} onClick={() => setTarget({ ...target, category: topic?.name?.toLowerCase() })} className={`${target?.category?.toLowerCase() === topic?.name?.toLowerCase() ? 'text-primary-500 font-semibold' : ''} cursor-pointer transition duration-200 hover:underline`}>{topic?.name}</div>
									})}
								</div>
							</div>
						</div>
						<div className="flex-none lg:w-1/3 w-full lg:mt-0 mt-10">
							<div className="w-full">
								<div className="w-full font-semibold mb-2 text-base">Characters:</div>
								<div className="w-full text-slate-400 mb-2 text-sm">
									The maximum characters allowed is {Settings?.quote?.max_characters}, 
									and the minimum is {Settings?.quote?.min_characters}.
								</div>
								<div className="w-full">
									<div className="w-full">
										<input onChange={(e) => 
										setTarget({ ...target, characters: parseInt(e.target.value) 
											>= Settings?.quote?.min_characters ? (parseInt(e.target.value) 
											>= Settings?.quote?.max_characters ? Settings?.quote?.max_characters : parseInt(e.target.value)) 
											: Settings?.quote?.min_characters })} 
										type="text" min={Settings?.quote?.min_characters} max={Settings?.quote?.max_characters} 
										className="inline-block outline-none bg-white border-slate-200 focus:border-primary-500 focus:border-b-2 border-b-2 outline-none py-2 w-full" 
										// value={target?.characters} 
										defaultValue={target?.characters} /> 
									</div>
								</div>
							</div>
							<div className="mt-6 w-full">
								<div className="w-full font-semibold mb-2 text-base">Quotes:</div>
								<div className="w-full text-slate-400 mb-2 text-sm">
									The maximum size allowed is {Settings?.quote?.max_quota} per/request.
								</div>
								<div className="w-full">
									<div className="w-full">
										<input onChange={(e) => 
										setTarget({ ...target, quota: parseInt(e.target.value) 
											>= Settings?.quote?.min_quota ? (parseInt(e.target.value) 
											>= Settings?.quote?.max_quota ? Settings?.quote?.max_quota : parseInt(e.target.value)) 
											: Settings?.quote?.min_quota })} 
										type="text" min={Settings?.quote?.min_quota} max={Settings?.quote?.max_quota} 
										className="inline-block outline-none bg-white border-slate-200 focus:border-primary-500 focus:border-b-2 border-b-2 outline-none py-2 w-full" 
										// value={target?.quota} 
										defaultValue={target?.quota} /> 
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-12 w-full text-center">
						<div onClick={() => (target?.category && (target?.phrase && target?.phrase?.length >= 6)) && startGenerating()} 
							className={`${target?.category && (target?.phrase && target?.phrase?.length >= 6) ? 'bg-primary-500 text-white hover:bg-primary-700' 
							: 'bg-slate-300 text-white'} w-auto mx-auto text-base cursor-pointer transition duration-200 py-4 px-8 shadow font-semibold inline-block rounded-full`}>
							Start Generating</div>
					</div>
				</>}
			</div>
		</section>
	</>
}

GenerateQuotesPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default GenerateQuotesPage