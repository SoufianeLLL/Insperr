import ContentContainer from "@/components/Containers/ContentContainer"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const Aboutus = () => {

    return <>
        <ContentContainer title="About us">
            Working on it...
        </ContentContainer>
    </>
}


Aboutus.getLayout = (page) => <UnauthenticatedLayout title="Insperr – About us">{page}</UnauthenticatedLayout>

export default Aboutus