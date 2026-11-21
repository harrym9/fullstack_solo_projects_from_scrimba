const API_BASE = "https://apis.scrimba.com/deckofcards/api/deck"
const VALUE_OPTIONS = [
    "2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"
]

let deckId = null
let remainingCards = 0
let computerScore = 0
let myScore = 0
let isLoading = false

const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function resetGameUI(remaining) {
    computerScore = 0
    myScore = 0
    computerScoreEl.textContent = "Computer score: 0"
    myScoreEl.textContent = "My score: 0"
    header.textContent = "Game of War"
    remainingText.textContent = `Remaining cards: ${remaining}`
    cardsContainer.children[0].innerHTML = ""
    cardsContainer.children[1].innerHTML = ""
}

function renderCard(slot, card) {
    const img = document.createElement("img")
    img.src = card.image
    img.alt = `${card.value} of ${card.suit}`
    img.className = "card"
    slot.replaceChildren(img)
}

async function handleNewDeck() {
    if (isLoading) return
    isLoading = true
    newDeckBtn.disabled = true
    drawCardBtn.disabled = true

    try {
        const res = await fetch(`${API_BASE}/new/shuffle/`)
        if (!res.ok) {
            throw new Error(`Failed to create deck (${res.status})`)
        }
        const data = await res.json()
        if (!data.deck_id) {
            throw new Error("Invalid deck response")
        }

        deckId = data.deck_id
        remainingCards = data.remaining
        resetGameUI(remainingCards)
    } catch (error) {
        header.textContent = "Could not load a new deck. Try again."
    } finally {
        isLoading = false
        newDeckBtn.disabled = false
        drawCardBtn.disabled = !deckId || remainingCards < 2
    }
}

async function handleDrawCards() {
    if (isLoading || !deckId || remainingCards < 2) return
    isLoading = true
    drawCardBtn.disabled = true
    newDeckBtn.disabled = true

    try {
        const res = await fetch(`${API_BASE}/${deckId}/draw/?count=2`)
        if (!res.ok) {
            throw new Error(`Failed to draw cards (${res.status})`)
        }
        const data = await res.json()
        if (!data.cards || data.cards.length < 2) {
            throw new Error("Not enough cards returned")
        }

        remainingCards = data.remaining
        remainingText.textContent = `Remaining cards: ${remainingCards}`
        renderCard(cardsContainer.children[0], data.cards[0])
        renderCard(cardsContainer.children[1], data.cards[1])

        const winnerText = determineCardWinner(data.cards[0], data.cards[1])
        header.textContent = winnerText

        if (remainingCards < 2) {
            if (computerScore > myScore) {
                header.textContent = "The computer won the game!"
            } else if (myScore > computerScore) {
                header.textContent = "You won the game!"
            } else {
                header.textContent = "It's a tie game!"
            }
        }
    } catch (error) {
        header.textContent = "Could not draw cards. Try again."
    } finally {
        isLoading = false
        newDeckBtn.disabled = false
        drawCardBtn.disabled = !deckId || remainingCards < 2
    }
}

function determineCardWinner(card1, card2) {
    const card1ValueIndex = VALUE_OPTIONS.indexOf(card1.value)
    const card2ValueIndex = VALUE_OPTIONS.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}

newDeckBtn.addEventListener("click", handleNewDeck)
drawCardBtn.addEventListener("click", handleDrawCards)
