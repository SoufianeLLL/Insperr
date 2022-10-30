import Link from "next/link"

const searchForAuthors = async (e, authors) => {
    let fetchedAuthors = []
    if (e?.target?.value && e?.target?.value?.length > 4) {
        await authors.map((post) => {
            if (post?.name?.toLowerCase()?.includes(e?.target?.value?.toLowerCase())) {
                fetchedAuthors.push(post)
            }
        })
        if (fetchedAuthors?.length === 0) {
            return { 
                error: <div>The name is not found on our Database, please <Link href="/authors/add" className="text-blue-500">click here</Link> to add this name (make sure it's a correct name or you'll get banned from this feature).</div>
            };
        }
        else {
            return fetchedAuthors
        }
    }
    else {
        return { 
            error: 'Please keep writing...' 
        }
    }
}

const fetcher = (url) => fetch(url).then((res) => res.json())

export {
    fetcher,
    searchForAuthors
}