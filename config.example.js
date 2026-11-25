// Copy this file to `config.js` and replace the placeholder values with your own API keys.
// `config.js` is listed in .gitignore so your real keys are never committed to GitHub.

export const CONFIG = {
    movieWatchlist: {
        apiKey: "YOUR_OMDB_API_KEY",
        apiUrl: "https://www.omdbapi.com/",
    },
    pollyGlot: {
        aiKey: "YOUR_AI_API_KEY", // My ai provider is groq.com
        aiUrl: "YOUR_AI_URL", // My for example: https://api.groq.com/openai/v1
        aiModel: "YOUR_AI_MODEL", //My for example: "openai/gpt-oss-120b"
    }
    // Add future projects here:
    // projectName: {
    //     apiKey: "YOUR_API_KEY",
    //     apiUrl: "https://api.example.com/",
    // },
};
