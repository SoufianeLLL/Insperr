import useSWR, { useSWRConfig } from "swr"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Settings } from "@/utils/settings"
import Loading from "@/components/Loading"
import Sidebar from "@/components/Auth/Sidebar"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


interface targetVars {
	phrase: String;
	category: String;
	place: String;
	characters: Number;
	quota: Number;
}


const GenerateQuotesPage = () => {

	const router = useRouter()

	// Get Topics list
	const { cache } = useSWRConfig()
	let TopicsURI = `/api/topic`, Topics = cache.get(TopicsURI) ?? useSWR(TopicsURI)?.data
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)


	const [error, setError] = useState(null)
	const [rules, setRules] = useState(null)
	const [subs, setSubs] = useState(null)
	const [ganaratorHelper, setGeneratorHelper] = useState(null)
	const [loading, setLoading] = useState({ isLoading: false, text: null })
	const [target, setTarget] = useState<targetVars>({
		phrase: null,
		category: null,
		place: 'startwith',
		characters: Settings?.quote?.max_characters,
		quota: 1 
	})


	useEffect(() => {
		document.body.classList.remove("bg-slate-100")
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
		if (!rules) {
			setRules({
				min_characters: Settings?.quote?.min_characters,
				max_characters: Settings?.quote?.max_characters,
				min_quota: Settings?.quote?.min_quota,
				max_quota: Settings?.quote?.max_quota,
			})
		}
		return () => {
			document.body.classList.add("bg-slate-100")
			setGeneratorHelper(false)
		}
	}, [rules, subs])
	
	const startGenerating = async () => {
		if (!loading?.isLoading && target?.category && target?.phrase && userData?.generatedQuotes?.toLocaleString() < subs?.quotes) {
			setLoading({
				isLoading: true,
				text: "Please sit tight, we will start generating your quotes in the next few seconds. D'ont close this window!"
			})
			// Start generating
			const res = await fetch('/api/ai/new', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					phrase: target?.phrase ?? null,
					category: target?.category ?? null,
					place: target?.place ?? 'startwith',
					characters: target?.characters ?? 250,
					quota: target?.quota ?? 1 
				})
			})
			.then(async (res) => { return await res?.json() })

			if (res) {
				if (res?.status) {
					setError(res?.message)
				}
				else if(res?.resultIDs) {
					setError(null)
					router.push(`/dashboard/user/results?resultIds=${res?.resultIDs}`)
				}
				setLoading({ isLoading: false, text: null })
			}
			else {
				setError('[code: 40300]: There was an error during the process please contact the admin.')
				setLoading({ isLoading: false, text: null })
			}
		}
	}

	return <>
		{!loading?.isLoading && rules && <Sidebar title="GPT-3 generator" state={ganaratorHelper} callback={(e) => setGeneratorHelper(e)}>
			<pre>{JSON.stringify((rules), null, 3)?.replaceAll(/['"]+/g, '')}</pre>
		</Sidebar>}
		<section className="w-full 2xl:px-0 max-w-7xl">
			<div className="w-full pb-3 overflow-hidden">
				{loading?.isLoading ? <div className="w-full max-w-sm h-screen mx-auto text-center">
					<Loading text={loading?.text ?? null} width={50} height={50} /></div>
				:
				<>
					{userData?.generatedQuotes?.toLocaleString() >= subs?.quotes && 
					<div className="flex items-center gap-4 w-full mb-8 py-2 px-4 md:py-3 md:px-5 bg-red-100 text-red-500 border-2 border-red-400 rounded-xl text-base">
						<svg className="w-10 h-10" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17v2m0-9v6m0-13L2 22h20L12 3z"></path></svg>
						Your subscription has reached {subs?.quotes} Quotes in total, which is 100% of your monthly quota, you can always upgrade your account to use more quota.
					</div>}
					<div className="heading w-full">
						<div className="text-xl md:text-2xl font-semibold w-full flex items-center gap-3">
							Generate new Quotes
							<div onClick={() => setGeneratorHelper(true)} className="cursor-pointer hover:text-slate-500 transition duration-200 flex items-center justify-center text-slate-300">
								<svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg>
							</div>
						</div>
					</div>
					{error && <div className="w-full text-red-500 text-base mt-4">{error}</div>}
					<div className="w-full lg:flex lg:items-start lg:gap-12 mt-5">
						<div className="shrink w-full rounded-xl">
							<div className="w-full">
								<div className="w-full font-somibold mb-2 text-base">Keyword (type something relevant)</div>
								<input onChange={async (e) => setTarget({ ...target, phrase: e?.target?.value })} 
								className="w-full outline-none border-slate-200 focus:border-primary-500 focus:border-b-2 border-b-2 py-2 w-full bg-white placeholder-slate-400 text-left" 
								placeholder="i.e Love is" type="text" name="custom-word" />
							</div>
							<div className="mt-8 category-col w-full">
								<div className="w-full font-somibold text-base mb-2">Select topic:</div>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 text-base">
									{Topics?.map ((topic, i) => {
										return <div 
											key={i} 
											onClick={() => setTarget({ ...target, category: topic?.name?.toLowerCase() })} 
											className={`${target?.category?.toLowerCase() === topic?.name?.toLowerCase() ? 'text-primary-500 font-semibold' : ''} cursor-pointer transition duration-200 hover:underline`}>
												{topic?.name}</div>
									})}
								</div>
							</div>
						</div>
						<div className="flex-none lg:w-1/3 w-full lg:mt-0 mt-10">
							<div className="w-full">
								<div className="w-full font-somibold mb-2 text-base">Keyword place:</div>
								<div className="flex items-center gap-3">
									<div onClick={() => setTarget({ ...target, place: 'startwith' })} className={`${target?.place === 'startwith' ? 'font-semibold text-primary-500' : ''} hover:underline cursor-pointer text-base`}>
										Start with</div>
									<div onClick={() => setTarget({ ...target, place: 'contains' })} className={`${target?.place === 'contains' ? 'font-semibold text-primary-500' : ''} hover:underline cursor-pointer text-base`}>
										Contains</div>
								</div>
							</div>
							<div className="w-full mt-6">
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
										value={(target?.characters)?.toString()} /> 
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
										setTarget({ ...target, quota: parseInt(e.target.value) > Settings?.quote?.min_quota ? 
											(parseInt(e.target.value) > Settings?.quote?.max_quota ? Settings?.quote?.max_quota : parseInt(e.target.value)) 
											: Settings?.quote?.min_quota })} 
										type="text" min={Settings?.quote?.min_quota} max={Settings?.quote?.max_quota} 
										className="inline-block outline-none bg-white border-slate-200 focus:border-primary-500 focus:border-b-2 border-b-2 outline-none py-2 w-full" 
										value={(target?.quota)?.toString()} /> 
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-12 w-full text-center">
						<div onClick={() => (target?.category && (target?.phrase && target?.phrase?.length >= 6) && userData?.generatedQuotes?.toLocaleString() < subs?.quotes) && startGenerating()} 
							className={`${target?.category && (target?.phrase && target?.phrase?.length >= 6) && userData?.generatedQuotes?.toLocaleString() < subs?.quotes ? 'bg-primary-500 text-white hover:bg-primary-700' 
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