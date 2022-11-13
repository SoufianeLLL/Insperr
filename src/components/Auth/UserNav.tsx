import { useCallback } from 'react'
import Link from 'next/link'
import { useSessionContext } from '@supabase/auth-helpers-react'
import AvatarContainer from '@/components/Containers/AvatarContainer'
import { useSignOutMutation } from "@/lib/api/auth"


const UserNav = ({ user, isAuthPage=false }) => {

	const { supabaseClient } = useSessionContext()
	const { mutate: signOut } = useSignOutMutation()
	
	const onSignOut = useCallback(() => {
		signOut({ supabaseClient })
	}, [])
	
	return (
        <div className="flex items-center gap-5 user-nav">
			<Link href="/dashboard/user/account" className="hidden sm:flex items-center gap-2">
                <div className="flex relative bg-slate-100 dark:bg-slate-800 w-7 h-7 rounded-full items-center justify-center">
					<AvatarContainer avatar={user?.avatar} width={30} height={30} />
				</div>
                {user?.fullname ?? user?.email}</Link>
			{!isAuthPage ? <Link href="/pricing">Pricing</Link> : <Link href="/dashboard">Dashboard</Link>}
			<div onClick={() => onSignOut()} className="hidden sm:block cursor-pointer">Sign Out</div>
		</div>
    );
}

export default UserNav