import useSWR from 'swr'
import { useState } from 'react'
import { fetcher } from '@/lib/global'
import { capitalizer } from '@/lib/validation'
import Loading from "@/components/Loading"


const AuthorList = () => {

	const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
	const [clipboard, setClipboard] = useState(null)
	const [targetLetter, setTargetLetter] = useState('a')

	// get all authors names based on the letter
	let Authors = useSWR(`/api/author?letter=${targetLetter}`, fetcher)

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
			{Authors && Authors?.data ? 
			<>
				{clipboard && <div style={{ zIndex: 1000 }} className="fixed bottom-5 bg-black rounded-xl overflow-hidden flex items-center px-1.5 py-2 text-white text-base left-5">
					<span className="bg-primary-500 rounded-lg py-2 px-3">Copied</span>
					<span className="px-4">{clipboard}</span>
				</div>}
				<div className="w-full">
					<div className="w-full text-center inline-block">
						{letters?.map((letter, i) => {
							return <div key={i} onClick={() => setTargetLetter(letter?.toLowerCase())} 
								className={`${targetLetter?.toLowerCase() === letter?.toLowerCase() ? 'bg-primary-50 text-primary-500' : 'hover:bg-primary-50 hover:text-primary-500'} mx-1 inline-block transition duration-200 font-semibold cursor-pointer py-2 px-3 rounded-lg mb-3 text-base`}>
								{letter?.toUpperCase()}</div>
						})}
					</div>
					<div className="mt-8 w-full">
						<div className="w-full border-t border-zinc-200 my-5 list-of-authors-started-with">
							<div className="letter text-4xl md:text-5xl my-5 fontBold">{targetLetter?.toUpperCase()}</div>
							<div className="w-full text-zinc-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-6">
								{Authors?.data?.map((data, i) => {
									return <div key={data?.id} onClick={() => copy(capitalizer(data?.name))} className="w-full mb-2 cursor-pointer hover:text-black text-base">
										{capitalizer(data?.name)}</div>
								})}
							</div>
						</div>
					</div>
				</div>
			</>
			: 
			<div className="w-full text-center my-20 text-base">
				<Loading text="Loading..." width={50} height={50} />
			</div>}
		</div>
	</>
}

export default AuthorList