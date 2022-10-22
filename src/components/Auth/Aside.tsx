import Link from "next/link"
import Image from "next/image"
import { useCallback, useState } from 'react'
import { useSignOutMutation } from "@/lib/api/auth"
import BlueButton from "@/components/BlueButton"


const UserSidebar = ({ user, router }) => {

	const [toggleUserMenu, setToggleUserMenu] = useState(false)
	const { mutate: signOut } = useSignOutMutation()
	
	const onSignOut = useCallback(() => {
		signOut()
	}, [])

	return <>
		<aside className="fixed bg-white z-10 top-0 py-3 px-5 flex flex-none flex-col justify-between h-screen border-r border-slate-100 w-24 md:w-72 overflow-hidden">
			<div>
				<div>
					<Link href="/dashboard"><a className="hover:bg-primary-100 transition-all rounded-full w-14 h-14 flex items-center justify-center">
						SVG</a></Link>
				</div>
				<ul className="mt-8">
					<li className="-mt-2">
						<Link href="/dashboard"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard' ? 'font-semibold' : ''} inline-block w-full nav-link text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24"><path stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M3 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 4.52 10 5.08 10 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 10 7.92 10 6.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 8.48 3 7.92 3 6.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 3 16.08 3 17.2 3h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 10 18.92 10 17.8 10h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 8.48 14 7.92 14 6.8v-.6zm-11 11c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 14 5.08 14 6.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C10 15.52 10 16.08 10 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C8.48 21 7.92 21 6.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-.6zm11 0c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C15.52 14 16.08 14 17.2 14h.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 15.52 21 16.08 21 17.2v.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21h-.6c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C14 19.48 14 18.92 14 17.8v-.6z"></path></svg>
								<span className="hidden md:block float-left ml-4">Dashboard</span>
							</div>
						</a></Link>
					</li>
					<li className="-mt-2">
						<Link href="/dashboard/user/collection"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/collection' ? 'font-semibold' : ''} inline-block w-full nav-link text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeWidth="2" d="M5 2h6l2 4h6v4H5V2zm-3 8h20l-3 12H5L2 10z"></path></svg>
								<span className="hidden md:block float-left ml-4">Collection</span>
							</div>
						</a></Link>
					</li>
					<li className="-mt-2">
						<Link href="/dashboard/user/bookmarks"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/bookmarks' ? 'font-semibold' : ''} inline-block w-full nav-link text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeWidth="2" d="M5 1v21l7-5 7 5V1z"></path></svg>
								<span className="hidden md:block float-left ml-4">Bookmarks</span>
							</div>
						</a></Link>
					</li>
					<li className="-mt-2">
						<Link href={`/user/@${user?.user_metadata?.username}`}><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === `dashboard/user/${user?.user_metadata?.username}` ? 'font-semibold' : ''} inline-block w-full nav-link text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeWidth="2" d="M20 15c-1 1 1.25 3.75 0 5s-4-1-5 0-1.5 3-3 3-2-2-3-3-3.75 1.25-5 0 1-4 0-5-3-1.5-3-3 2-2 3-3-1.25-3.75 0-5 4 1 5 0 1.5-3 3-3 2 2 3 3 3.75-1.25 5 0-1 4 0 5 3 1.5 3 3-2 2-3 3zM7 12l3 3 7-7"></path></svg>
								<span className="hidden md:block float-left ml-4">Profile</span>
							</div>
						</a></Link>
					</li>
					<li className="-mt-2">
						<Link href="/docs"><a className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'docs' ? 'font-semibold' : ''} inline-block w-full nav-link text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeWidth="2" d="M9 1v7L2 20v3h20v-3L15 8V1m0 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9-7c-7-3-6 4-12 1M6 1h12"></path></svg>
								<span className="hidden md:block float-left ml-4">Docs</span>
							</div>
						</a></Link>
					</li>
					<li className="-mt-2">
						<div className={`${(router.pathname)?.replace(/^\/|\/$/g, '') === 'dashboard/user/api' ? 'font-semibold' : ''} cursor-wait inline-block w-full opacity-20 text-black group`}>
							<div className="pl-4 pr-6 py-3 inline-block rounded-full w-auto">
								<svg className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeWidth="2" d="M2 5.077S3.667 2 12 2s10 3.077 10 3.077v13.846S20.333 22 12 22 2 18.923 2 18.923V5.077zM2 13s3.333 3 10 3 10-3 10-3M2 7s3.333 3 10 3 10-3 10-3"></path></svg>
								<span className="hidden md:block float-left ml-4">API</span>
							</div>
						</div>
					</li>
					<li className="block md:hidden">
						<BlueButton text={
							<div className="w-full py-1 flex items-center justify-center"><svg viewBox="0 0 24 24" height="25" width="25" className="text-white w-8 h-8"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 18V6m-6 6h12"></path></svg></div>
						} smallSize={false} url="/dashboard/user/g" />
					</li>
					<li className="hidden md:block">
						<BlueButton text="Generate" smallSize={false} url="/dashboard/user/g" />
					</li>
				</ul>
			</div>
			<div className="pt-4 flex justify-between relative">
				{toggleUserMenu && 
				<>
					<div onClick={() => setToggleUserMenu(false)} style={{ zIndex: 1001 }} className="fixed top-0 left-0 bottom-0 right-0 w-full h-full"></div>
					<div style={{ boxShadow: '0 0 12px 3px rgba(0, 0, 0, 0.1)', zIndex: 1002 }} className="text-base py-2 fixed lg:absolute left-4 lg:left-0 bottom-20 w-60 max-w-full bg-white rounded-lg">
						<Link href="/dashboard/user/account"><a className="hover:bg-slate-50 transition-all py-3 px-5 w-full inline-block">Account Settings</a></Link>
						<button onClick={() => onSignOut()} className="ring-0 hover:bg-slate-50 transition-all py-3 px-5 w-full inline-block border-t border-slate-100 text-left">Log Out @{user?.user_metadata?.username}</button>
					</div>
				</>}
				<button onClick={() => setToggleUserMenu(true)} className="p-2 md:px-4 md:py-3 w-full flex gap-x-2 items-center hover:bg-slate-200 rounded-full text-sm text-black text-left">
					{user?.user_metadata?.avatar_url ? 
					<Image 
						className="inline-block rounded-full"
						src={user?.user_metadata?.avatar_url}
						blurDataURL={require('../../../public/images/avatar.jpg')} 
						placeholder="blur"
						unoptimized={true} 
						height={40}
						width={40} />
					:
					<Image 
						className="inline-block rounded-full"
						src={require('../../../public/images/avatar.jpg')} 
						placeholder="blur"
						unoptimized={true} 
						height={40}
						width={40} />
					}
					<div className="hidden md:block">
						<div className="font-semibold">{user?.user_metadata?.fullname}</div>
						<div className="text-slate-600">@{user?.user_metadata?.username}</div>
					</div>
				</button>
			</div>
		</aside>
	</>
}

export default UserSidebar