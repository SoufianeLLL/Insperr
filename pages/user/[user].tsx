import useSWR from 'swr'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import Loading from "@/components/Loading"
import { Skeleton } from '@/components/Skeleton'
import ShowToast from '@/components/ShowToast'
import QuoteContainer from '@/components/Containers/QuoteContainer'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"



const UserProfile = ({ username }) => {

	const [Callback, setCallback] = useState({ status: null, text: null })
	const { ref, inView } = useInView()

	let { isValidating, data: user } = useSWR(`/api/user/${username}`)

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView])

    const { isLoading, data: Pagination, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
		'quotes',
		async ({ pageParam = 0 }) => {
				await new Promise((res) => setTimeout(res, 1000))
				const res = await fetch(`/api/quote?number=${20}&action=getUserCustomQuotes&user_id=${user?.id}&page=${pageParam}`)
				const data = await res?.json()
		        return data
		},
		{
			getNextPageParam: (lastPage) => lastPage?.count ? lastPage?.page : false
		}
    )	

	return <>
		{(Callback?.status && Callback?.text) && <ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto bg-white dark:bg-black">
			<div className="heading w-full pb-10">
				{ isValidating ? <Loading text="" scpace='0' borderWidth={2} width={30} height={30} /> : 
					<div className="w-full">
						<div className="w-full text-3xl fontRobotoBold md:text-4xl lg:text-5xl">{user?.fullname}</div>
						<div className="w-full mt-3 text-sm md:text-base font-semibold">@{username}</div>
					</div>}
			</div>
		</section>
		<section className="w-full py-10 md:py-12 px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto bg-slate-100 dark:bg-black">
			<div className="w-full">
				{isLoading ? <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6"><Skeleton /></div> :
				Pagination && Pagination?.pages && Pagination?.pages?.length > 0 ? <>
					<div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
						{Pagination?.pages?.map((page) => {
							return page?.quotes?.map((quote, i) => {
								return <QuoteContainer  key={i} id={i} quote={{
									id: quote?.id,
									fullname: quote?.users?.fullname,
									username: quote?.users?.username,
									is_verified: quote?.users?.is_verified,
									avatar: quote?.users?.avatar,
									keyword: quote?.keyword,
									topics: quote?.topics,
									content: quote?.content,
									status: quote?.tweet_metadata?.status,
									tweet_id: quote?.tweet_metadata?.tweet_id,
								}} callback={(e) => setCallback(e)} />
							})
						})}
					</div>
					<div className="pagination mt-12 text-base text-center">
						{isFetchingNextPage ? <Loading text="Loading..." borderWidth={2} width={30} height={30} /> 
						: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
					</div>
				</>
				:
				<div className="w-full text-center border border-slate-200 rounded-lg px-5 md:px-10 py-12 md:py-24">
					<svg width="80" height="80" viewBox="0 0 24 24" className="text-slate-200 mx-auto mb-4 w-32 h-32"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 4a2 2 0 1 1 4 0v6h6v4H4v-4h6V4zM4 14h16v8H4v-8zm12 8v-5.635M8 22v-5.635M12 22v-5.635"></path></svg>
					An error was occurred, please contact us by email at <Link href="mailto:support@insperr.com">support@insperr.com</Link> 
				</div>}
			</div>
		</section>
	</>;
}


UserProfile.getInitialProps = async ({ 'query': {user} }) => { 
    const username = user?.replace(/@/gi, '')
    if (username) {
        return { username }
    }
    return { 
        redirect: {
            permanent: false,
            destination: "/"
        }
    }
}

UserProfile.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default UserProfile