import useSWR, { useSWRConfig } from "swr"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Settings } from "@/utils/settings"
import AvatarContainer from "@/components/Containers/AvatarContainer"
import BlueButton from "@/components/BlueButton"
import Loading from "@/components/Loading"


interface targetVars {
	phrase: String;
	category: String;
	type: String;
	characters: Number;
	quota: Number;
}

let categoriesSelector = null

const GenerateTweet = ({ user }) => {

	const router = useRouter()

	// Get Topics list
	const { cache } = useSWRConfig()
	let TopicsURI = `/api/topic`, Topics = cache.get(TopicsURI) ?? useSWR(TopicsURI)?.data

	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)

	const [subs, setSubs] = useState(null)
	const [error, setError] = useState(null)
	const [generator, setGeneratorStatus] = useState({ isLoading: false, text: null })
	const [target, setTarget] = useState<targetVars>({
		phrase: null,
		category: null,
		type: 'post',
		characters: Settings?.quote?.max_characters,
		quota: 1 
	})

	const runGenerator = async () => {
		if (!generator?.isLoading && target?.category && target?.phrase) {
			setGeneratorStatus({
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
					characters: 250,
				})
			})
			.then(async (res) => { return await res?.json() })
			if (res) {
				if (res?.status) {
					setError(res?.message)
				}
				else if(res?.resultId) {
					setError(null)
					// const res = {
					// 	resultId: "86329475-156f-4445-b248-eeb90d3a85c9"
					// }
					// Redirect after quote created
					router?.push(`/dashboard/user/status/${res?.resultId}`)
				}
				setGeneratorStatus({ isLoading: false, text: null })
			}
			else {
				setError('[code: 40300]: There was an error during the process please contact the admin.')
				setGeneratorStatus({ isLoading: false, text: null })
			}
		}
	}

	useEffect(() => {
		if (!categoriesSelector && Topics) {
			categoriesSelector = <select onChange={(e) => setTarget({ ...target, category: e?.target?.value?.toLowerCase() })} className="rounded-full py-1 pl-2 pr-6 text-sm bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-900 transition duration-200 text-slate-500 dark:text-zinc-500 focus:outline-none cursor-pointer focus:ring-0 border focus:border-slate-200 dark:focus:border-zinc-800 border-slate-200 dark:border-zinc-800" id="category" required={true}>
				<option>Select category</option>
				{Topics?.map ((topic, i) => {
					return <option value={topic?.name?.toLowerCase()} key={i}>{topic?.name}</option>
				})}
			</select>
		}
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
	}, [subs])

	// if (isCheckingSubscription && !userData) {
	// 	return <div className="text-center mt-4 w-full"><Loading text="null" width={50} height={50} /></div>
	// }
	// else {
		return <>
			{parseInt(userData?.generatedQuotes?.toLocaleString(), 10) >= subs?.quotes ? 
				<div className="flex items-center gap-4 w-full py-2 px-4 md:py-3 md:px-5 bg-red-100 text-red-500 dark:bg-opacity-20 rounded-xl text-base">
					<svg className="hidden md:block w-20 h-20" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17v2m0-9v6m0-13L2 22h20L12 3z"></path></svg>
					Your subscription has reached {subs?.quotes} Quotes in total, which is 100% of your monthly quota, you can always upgrade your account to use more quota.
				</div>
			:
			<>
				<div className="w-full shrink mb-8 text-base md:text-xl">
					✏️ Let's get you writing!
				</div>
				<div className="w-full">
					{generator?.isLoading ? 
						<div className="text-center w-full">
							<Loading text="null" width={50} height={50} />
							<div className="max-w-sm mx-auto w-full text-sm">{generator?.text}</div>
						</div>
					: 
					<>
						{error && <div className="w-full text-red-500 text-base mb-2">{error}</div>}
						<div className="w-full flex gap-4 items-start">
							<div className="photo flex-none">
								<AvatarContainer avatar={user?.user_metadata?.avatar_url} width={45} height={45} />
							</div>
							<div className="w-full shrink">
								<div className="w-full mt-2">
									<input onChange={async (e) => setTarget({ ...target, phrase: e?.target?.value })} 
										type="text" className="w-full p-0 border-0 bg-transparent outline-none focus:ring-0" 
										placeholder="Type your keyword" />
								</div>
								<div className="w-full flex items-center gap-3 mt-2">
									<select onChange={(e) => setTarget({ ...target, type: e?.target?.value?.toLowerCase() })} className="rounded-full py-1 px-2 text-sm bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-900 transition duration-200 text-slate-500 dark:text-zinc-500 outline-none cursor-pointer focus:ring-0 border focus:border-slate-200 dark:focus:border-zinc-800 border-slate-200 dark:border-zinc-800" id="type" required={true}>
										<option value="Post">Post</option>
										<option value="Thread" disabled>Thread</option>
										<option value="Poll" disabled>Poll</option>
									</select>
									{categoriesSelector}
								</div>
							</div>
						</div>
						<div className="flex justify-end w-full mt-1">
							<div onClick={() => runGenerator()} className="rounded-full"><BlueButton fullWidth={false} text="Generate" isLink={false} /></div>
						</div>
					</>}
				</div>
			</>}
		</>
	// }
}

export default GenerateTweet