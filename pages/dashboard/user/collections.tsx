import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const CollectionsPage = () => {

	return <>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-5 overflow-hidden">
				<div className="heading w-full">
					<div className="text-xl md:text-2xl font-semibold w-full">Collections</div>
				</div>
			</div>
		</section>
	</>
}

CollectionsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default CollectionsPage