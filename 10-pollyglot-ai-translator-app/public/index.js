document.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userInput = document.getElementById("input-data").value
    const userTargetLanguage = document.querySelector('input[ name = "languages" ]:checked').value

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
            throw Error("There something happened when fetching data from the server: " + response.status)
        }
        const data = await response.json()
        console.log(data.translation)
    }
    catch (err) {
        console.error("Error: " + err)
    }
})

