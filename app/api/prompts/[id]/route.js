import Prompt from "@models/prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDb()
        const prompt = await Prompt.findById(res.params.id).populate('creator')
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (e) {
        return new Response("Failed to fetch a prompt", { status: 500 })
    }
}

export const PATCH = async (req, res) => {
    try {
        const { prompt, tag } = await req.json()
        await connectToDb()
        const existingPrompt = await Prompt.findById(res.params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (e) {
        return new Response("Failed to modify a prompt", { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    try {
        await connectToDb()
        await Prompt.findByIdAndRemove(res.params.id);
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (e) {
        return new Response("Failed to delete a prompt", { status: 500 })

    }
}