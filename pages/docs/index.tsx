import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const Docs = () => {
    return <>
        <section className="w-full overflow-hidden">
            Documentation...
        </section>
    </>
}

Docs.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default Docs