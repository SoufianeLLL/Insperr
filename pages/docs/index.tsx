import { useEffect } from "react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const Docs = () => {

    useEffect(() => {
		document.body.classList.remove("bg-slate-100")
		return () => document.body.classList.add("bg-slate-100"); document.body.classList.add("dark:bg-slate-900")
	}, [])

    return <>
        <section className="w-full overflow-hidden">
            Documentation...
        </section>
    </>
}

Docs.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default Docs