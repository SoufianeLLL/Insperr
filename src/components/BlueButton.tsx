import Link from "next/link"

const BlueButton = ({ url, padding=null, text, smallSize=true, fullWidth=true }) => {
    return <Link href={url}>
        <a className={`${smallSize ? 'text-sm py-2 px-4' : 'px-6 py-4 text-base'} ${fullWidth ? 'w-full' : ''} inline-block  text-center transition-all shadow font-semibold bg-primary-500 hover:bg-primary-700 rounded-full text-white`}>
            {text}</a></Link>
}

export default BlueButton