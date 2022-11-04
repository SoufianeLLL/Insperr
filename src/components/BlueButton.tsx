import Link from "next/link"

const BlueButton = ({ url=null, isLink=true, text, smallSize=true, fullWidth=true, className="bg-primary-500 hover:bg-primary-700 text-white" }) => {
    if (isLink) {
        return (
            <Link
            href={url}
            className={`${smallSize ? 'text-sm py-2 px-4' : 'md:px-6 md:py-4 p-3 text-base'} ${fullWidth ? 'w-full' : ''} inline-block text-center transition-all shadow md:font-semibold rounded-full ${className}`}>
                {text}</Link>
        );
    }
    return <div className={`${smallSize ? 'text-sm py-2 px-4' : 'md:px-6 md:py-4 p-3 text-base'} ${fullWidth ? 'w-full' : ''} inline-block text-center transition-all shadow md:font-semibold rounded-full ${className}`}>
            {text}</div>
}

export default BlueButton