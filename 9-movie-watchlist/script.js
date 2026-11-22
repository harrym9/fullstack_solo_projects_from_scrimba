import { CONFIG } from "../config.js";
import { addFilmToWatchlist, isInWatchlist } from "./storage.js";

const searchFormEl = document.querySelector(".search")
const searchInputEl = document.querySelector(".search-input")
const filmListEl = document.querySelector(".films-list")
const placeholderEl = document.querySelector(".empty-placeholder")

let films = []
let hasSearched = false

searchFormEl.addEventListener("submit", async e => {
    e.preventDefault()
    const query = searchInputEl.value.trim()
    if (!query) return

    hasSearched = true
    filmListEl.innerHTML = ""
    placeholderEl.innerHTML = `<p class="status-msg">Searching...</p>`

    try {
        films = await fetchDataFromApiBySearch(query)
        render()
    } catch {
        films = []
        placeholderEl.innerHTML = `<p class="status-msg">Something went wrong. Please try again.</p>`
    }

    searchInputEl.value = ""
})

filmListEl.addEventListener("click", e => {
    const btn = e.target.closest(".add-btn")
    if (!btn || btn.disabled) return

    const filmId = btn.dataset.id
    const selectedFilm = films.find(film => film.imdbID === filmId)
    if (!selectedFilm) return

    addFilmToWatchlist(selectedFilm)
    btn.textContent = "✓ Added"
    btn.classList.add("added")
    btn.disabled = true
})

async function fetchDataFromApiBySearch(inputValue) {
    const response = await fetch(
        `${CONFIG.movieWatchlist.apiUrl}?apikey=${CONFIG.movieWatchlist.apiKey}&s=${encodeURIComponent(inputValue)}&type=movie`
    )
    const data = await response.json()
    if (data.Response === "False" || !data.Search) {
        return []
    }
    const formattedIds = data.Search.map(movie => movie.imdbID)
    return fetchDataFromApiById(formattedIds)
}

async function fetchDataFromApiById(idValues) {
    const filmData = idValues.map(async id => {
        const response = await fetch(
            `${CONFIG.movieWatchlist.apiUrl}?apikey=${CONFIG.movieWatchlist.apiKey}&i=${id}&type=movie`
        )
        return response.json()
    })
    return Promise.all(filmData)
}

function render() {
    if (films.length > 0) {
        placeholderEl.innerHTML = ""
        const filmsHtml = films.map(film => {
            const saved = isInWatchlist(film.imdbID)
            const hasPoster = film.Poster && film.Poster !== "N/A"
            const posterSrc = hasPoster ? film.Poster : "assets/film-light.svg"
            const posterClass = hasPoster ? "film-poster" : "film-poster fallback-poster"

            return `
        <article class="film">
            <img src="${posterSrc}"
                alt="Poster of ${film.Title}" class="${posterClass}">
            <div class="film-info">
                <div class="first-info">
                    <h2 class="film-title">${film.Title}</h2>
                    <p class="film-rating">
                        <img src="assets/star.svg" alt="" class="star-icon">
                        <span>${film.imdbRating || "N/A"}</span>
                    </p>
                </div>
                <div class="second-info">
                    <p class="film-duration">${film.Runtime || "N/A"}</p>
                    <p class="film-genre">${film.Genre || "N/A"}</p>
                    <button class="add-btn ${saved ? "added" : ""}" data-id="${film.imdbID}" ${saved ? "disabled" : ""}>
                        ${saved ? "✓ Added" : "+ Watchlist"}
                    </button>
                </div>
                <p class="film-plot">${film.Plot && film.Plot !== "N/A" ? film.Plot : "No plot summary available."}</p>
            </div>
        </article>`
        }).join("")
        filmListEl.innerHTML = filmsHtml
    } else {
        filmListEl.innerHTML = ""
        placeholderEl.innerHTML = hasSearched
            ? `<p class="status-msg">Unable to find what you're looking for. Please try another search.</p>`
            : `<img src="assets/film-light.svg" alt="Film reel icon" class="film-icon">
               <h2 class="placeholder-title">Start exploring</h2>`
    }
}

render()
