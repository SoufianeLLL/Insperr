import Link from "next/link"

const BlueButton = ({ url=null, isLink=true, text, smallSize=true, fullWidth=true, color="primary" }) => {
    if (isLink) {
        return (
            <Link
            href={url}
            className={`${smallSize ? 'text-sm py-2 px-4' : 'md:px-6 md:py-4 p-2 text-base'} ${fullWidth ? 'w-full' : ''} inline-block text-center transition-all shadow font-semibold bg-${color}-500 ${color === 'red' ? 'hover:bg-red-700' : 'hover:bg-primary-700'} rounded-full text-white`}>
                {text}</Link>
        );
    }
    return <div className={`${smallSize ? 'text-sm py-2 px-4' : 'md:px-6 md:py-4 p-2 text-base'} ${fullWidth ? 'w-full' : ''} inline-block text-center transition-all shadow font-semibold bg-${color}-500 ${color === 'red' ? 'hover:bg-red-700' : 'hover:bg-primary-700'} rounded-full text-white`}>
            {text}</div>
}

export default BlueButton