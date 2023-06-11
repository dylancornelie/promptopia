import Prompt from "@models/prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDb()
        const prompts = await Prompt.find({ creator: res.params.id }).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (e) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}