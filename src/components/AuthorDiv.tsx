import { capitalizer } from "@/lib/validation"

const AuthorDiv = ({ author, classes={ bgColor: 'bg-white', shadow: true, more: '' }, onClick=null }) => {

    return <>
        <div onClick={onClick} className={`${classes?.more} ${classes?.bgColor} ${classes?.shadow ? 'shadow' : ''} border-2 truncate overflow-hidden cursor-pointer rounded-full py-2 pl-2 pr-4 flex items-center gap-2 flex-none`}>
            <span className="flex-none bg-primary-500 rounded-full h-8 w-8"></span>
            <span className="flex-none pr-2">{capitalizer(author)}</span>
        </div>
    </>
}

export default AuthorDiv