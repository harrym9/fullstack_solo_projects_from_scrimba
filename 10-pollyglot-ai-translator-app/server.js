import express from "express"
import OpenAI from "openai"
import { CONFIG } from "../config.js"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("public"));

const agent = new OpenAI({
    baseURL: CONFIG.pollyGlot.aiUrl,
    apiKey: CONFIG.pollyGlot.aiKey,
})

app.post("/translate", async (req, res) => {
    const { text, language } = req.body
    const messages = [
        {
            role: "system",
            content: `
                You are a translator bot supporting French, Spanish, and Japanese.
                Translate the user's input into ${language}.
                Respond only with the translation.
                If the target language is Japanese, include the romaji pronunciation in parentheses after the translation.
                `
        },
        {
            role: "user",
            content: text
        }
    ]
    try {
        const response = await agent.chat.completions.create({
            model: CONFIG.pollyGlot.aiModel,
            messages
        })
        res.json({ translation: response.choices[0].message.content })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Translation failed" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
