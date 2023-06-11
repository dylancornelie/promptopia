import User from "@models/user"
import { connectToDb } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDb()
        const user = await User.findById(res.params.id)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (e) {
        return new Response("Failed to fetch user", { status: 500 })
    }
}