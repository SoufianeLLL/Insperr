import useSWR from "swr"
import { useState } from "react"
import Link from "next/link"
import { fetcher } from "@/lib/global"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import Loading from "@/components/Loading"



const IndexPage = () => {

	const [isFeatching, setFeatching] = useState({ status: false })
	const [target, setTarget] = useState('custom')

	// let Quotes = useSWR(`/api/author?number=${12}&random=${true}&search=${search}`, fetcher)
	
	const search = (target) => {
		setFeatching({ status: true })
		setTarget(target)
	}

	return <>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-20 overflow-hidden">
				<div className="heading w-full">
					<h2 className="w-full text-2xl md:text-4xl mb-2 fontSemiBold">Trending</h2>
					<div className="text-lg md:text-xl w-full flex items-center gap-10">
						<span onClick={() => search('custom')} 
							className={`cursor-pointer ${target === 'custom' ? 'font-semibold text-black underline' : 'text-zinc-400'}`}>Custom Quotes</span>
						<span onClick={() => search('database')} 
							className={`cursor-pointer ${target === 'database' ? 'font-semibold text-black underline' : 'text-zinc-400'}`}>Real Quotes</span>
					</div>
				</div>
				<div className="mt-8 w-full">
					{isFeatching?.status ? <div className="w-full mt-20 text-base mx-auto text-center">
						<Loading text="" width={80} height={80} /></div>
					:
					<div className="w-full grid grid-cols-3 gap-6">
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
						<div className="bg-zinc-100 h-60 rounded-md"></div>
					</div>}
				</div>
			</div>
		</section>
	</>
}

IndexPage.getLayout = (page) => <UnauthenticatedLayout home={true}>{page}</UnauthenticatedLayout>

export default IndexPage