import supabaseAdmin from "@/utils/supabase-admin"

const handler = async (req, res) => {
	    
    // Get all usernames
    const { data: usernames, error } = await supabaseAdmin
        .from('users')
        .select('username')
    
    if (!error)
        return res.status(200).json({
            usernames
        })

    return res.status(200).json()
}

export default handler