import { CONFIG } from "../config.js"
import OpenAI from "openai"

console.log(CONFIG.pollyGlot.aiKey)

const agent = new OpenAI({
    baseURL: CONFIG.pollyGlot.aiUrl,
    apiKey: CONFIG.pollyGlot.aiKey,
})

const messages = [
    {
        role: "system",
        content: `You are a translator bot with 3 language set.
                  French, German and Spanish! Your job is translate
                  user's input into target language and respond only with the translation. Target language is German`
    }
]

messages.push({
    role: 'user',
    content: 'You are beautiful'
})

const response = await agent.chat.completions.create({
    model: CONFIG.pollyGlot.aiModel,
    messages
})

console.log(response.choices[0].message.content)
