// import Link from "next/link"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const DashAuthorsPage = () => {

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10 overflow-hidden">
				<div className="heading w-full">
					<div className="text-2xl text-center fontSemiBold md:text-3xl font-semibold w-full">List of Authors</div>
					<div className="w-full mt-4 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">
						Looking for quotes by our most popular authors? Gather wisdom from the ages as you browse favorite quotes by famous authors.
					</div>
				</div>
				<div className="w-full mt-10">
                    ...
                </div>
			</div>
		</section>
	</>
}


DashAuthorsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default DashAuthorsPage