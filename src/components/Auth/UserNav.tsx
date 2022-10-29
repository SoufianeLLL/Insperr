import { useCallback } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useSignOutMutation } from "@/lib/api/auth"


const UserNav = ({ user, isAuthPage=false }) => {

	const { supabaseClient } = useSessionContext()
	const { mutate: signOut } = useSignOutMutation()
	
	const onSignOut = useCallback(() => {
		signOut({ supabaseClient })
	}, [])
	
	return (
		<div className="flex items-center gap-5 user-nav">
			<Link href="/dashboard/user/account"><a className="flex items-center gap-2">
				<div className="relative bg-slate-100 w-7 h-7 rounded-full flex items-center justify-center">
					{user?.avatar ? 
						<Image 
							className="inline-block rounded-full"
							src={user?.avatar}
							blurDataURL={require('../../../public/images/avatar.jpg')} 
							placeholder="blur"
							unoptimized={true} 
							height={30}
							width={30} />
					:
						<Image 
							className="inline-block rounded-full"
							src={require('../../../public/images/avatar.jpg')} 
							placeholder="blur"
							unoptimized={true} 
							height={30}
							width={30} />
						}
				</div>
				{user?.fullname ?? user?.email}</a></Link>
			{!isAuthPage ? <Link href="/pricing"><a>Pricing</a></Link> : <Link href="/dashboard"><a>Dashboard</a></Link>}
			<div onClick={() => onSignOut()} className="cursor-pointer">Sign Out</div>
		</div>
	)
}

export default UserNav