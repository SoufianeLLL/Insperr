import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const PaymentPage = ({ result }) => {

    return <>
        ... {result}
    </>
}

PaymentPage.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default PaymentPage