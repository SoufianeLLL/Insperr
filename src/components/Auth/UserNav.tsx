import { useCallback } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useSignOutMutation } from "@/lib/api/auth"
// import useSWR, { useSWRConfig } from 'swr'


const UserNav = ({ user, isAuthPage=false }) => {

	// const { cache } = useSWRConfig()
	// let URL = `/api/saves?user_id=${user?.id}`, 
	// 	Saves = cache.get(URL)?.length === 0 ? useSWR(URL) : cache.get(URL)

	const { mutate: signOut } = useSignOutMutation()
	
	const onSignOut = useCallback(() => {
		signOut()
	}, [])

	
	return (
		<div className="flex items-center gap-5 user-nav">
			<Link href="/dashboard/user/account"><a className="flex items-center gap-2">
				<div className="relative bg-slate-100 w-7 h-7 rounded-full flex items-center justify-center">
					{/* <div className="w-9 h-9 rounded-full border-2 border-blue-500 absolute -top-1 -left-1"></div> */}
					<Image 
					className="rounded-full"
					src={require('../../../public/images/avatar.jpg')} 
					placeholder="blur"
					unoptimized={true} 
					height={30}
					width={30} />
				</div>
				{user?.fullname ?? user?.email}</a></Link>
			{!isAuthPage ? <Link href="/pricing"><a>Pricing</a></Link> : <Link href="/dashboard"><a>Dashboard</a></Link>}
			<div onClick={() => onSignOut()} className="cursor-pointer">Sign Out</div>
		</div>
	)
}

export default UserNav