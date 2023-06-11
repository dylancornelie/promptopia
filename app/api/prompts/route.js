import Prompt from "@models/prompt"
import { connectToDb } from "@utils/database"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()
    try {
        await connectToDb()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (e) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}

export const GET = async () => {
    try {
        await connectToDb()
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (e) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}