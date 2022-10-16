import { useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import ShowToast from "@/components/ShowToast"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const UserAccount = () => {

	const { user } = useUser()	
	const [Callback, setCallback] = useState({ status: null, text: null })
	

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full overflow-hidden">
			<div className="w-full">
				<div className="w-full mb-8 text-base md:text-xl">
					✨ Recent Quotes added to your Bookmarks
				</div>
				<div className="mt-8 w-full">
                    ...
				</div>
			</div>
		</section>
	</>
}

UserAccount.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default UserAccount