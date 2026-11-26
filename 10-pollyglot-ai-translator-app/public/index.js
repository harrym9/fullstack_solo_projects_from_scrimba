const showTranslateDiv = document.querySelector(".show-translate")
const languageOptionsDiv = document.querySelector(".language-options")
const labelForDiv = document.querySelector(".label-for-div")
const translateBtn = document.querySelector("#translate-btn")
const inputPlace = document.getElementById("input-place")

translateBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    if (translateBtn.value === "Start Over") {
        setResultView(false)
        return
    }

    const userInput = inputPlace.value.trim()
    if (!userInput) return

    const userTargetLanguage = document.querySelector('input[name="languages"]:checked').value
    translateBtn.disabled = true
    translateBtn.value = "Translating..."

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: userInput,
                language: userTargetLanguage
            })
        })
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`)
        }
        const data = await response.json()
        setResultView(true, data.translation)
    } catch (err) {
        console.error("Error:", err)
        translateBtn.value = "Translate"
    } finally {
        translateBtn.disabled = false
    }
})

function setResultView(isResultVisible, translatedText = "") {
    showTranslateDiv.classList.toggle("hidden", !isResultVisible)
    languageOptionsDiv.classList.toggle("hidden", isResultVisible)
    labelForDiv.textContent = isResultVisible ? "Your translation 👇" : "Select language 👇"
    translateBtn.value = isResultVisible ? "Start Over" : "Translate"

    if (isResultVisible) {
        const p = document.createElement("p")
        p.textContent = translatedText
        showTranslateDiv.replaceChildren(p)
    } else {
        showTranslateDiv.replaceChildren()
        inputPlace.value = ""
    }
}
