import { getWatchlist, removeFilmFromWatchlist } from "./storage.js"

const filmListEl = document.querySelector(".films-list")
const placeholderEl = document.querySelector(".empty-placeholder")

filmListEl.addEventListener("click", e => {
    const btn = e.target.closest(".remove-btn")
    if (!btn) return

    removeFilmFromWatchlist(btn.dataset.id)
    render()
})

function render() {
    const films = getWatchlist()
    if (films.length > 0) {
        placeholderEl.innerHTML = ""
        const filmsHtml = films.map(film => {
            const hasPoster = film.poster && film.poster !== "N/A"
            const posterSrc = hasPoster ? film.poster : "assets/film-light.svg"
            const posterClass = hasPoster ? "film-poster" : "film-poster fallback-poster"

            return `
        <article class="film">
            <img src="${posterSrc}"
                alt="Poster of ${film.title}" class="${posterClass}">
            <div class="film-info">
                <div class="first-info">
                    <h2 class="film-title">${film.title}</h2>
                    <p class="film-rating">
                        <img src="assets/star.svg" alt="" class="star-icon">
                        <span>${film.rating || "N/A"}</span>
                    </p>
                </div>
                <div class="second-info">
                    <p class="film-duration">${film.runtime || "N/A"}</p>
                    <p class="film-genre">${film.genre || "N/A"}</p>
                    <button class="remove-btn" data-id="${film.id}">- Remove</button>
                </div>
                <p class="film-plot">${film.plot && film.plot !== "N/A" ? film.plot : "No plot summary available."}</p>
            </div>
        </article>`
        }).join("")
        filmListEl.innerHTML = filmsHtml
    } else {
        filmListEl.innerHTML = ""
        placeholderEl.innerHTML = `
            <h1>Your watchlist is looking a little empty...</h1>
            <a href="index.html"><span class="plus-sign">+</span> Let's add some movies!</a>`
    }
}

render()
