import { CONFIG } from "../config.js";

const searchInput = document.querySelector(".search-input")

document.addEventListener('submit', async e => {
    e.preventDefault()
    const data = searchInput.value
    if (data.trim() != "") {
        console.log(await fetchDataFromApiBySearch(data))
        searchInput.value = ""
    }
})

async function fetchDataFromApiBySearch(inputValue) {
    const response = await fetch(`${CONFIG.movieWatchlist.apiUrl}?apikey=${CONFIG.movieWatchlist.apiKey}&s=${inputValue}`)
    const data = await response.json()
    const formattedIds = data.Search.map(id => id.imdbID)
    return await fetchDataFromApiById(formattedIds)
}

async function fetchDataFromApiById(idValues) {
    const filmData = idValues.map(async (id) => {
        const response = await fetch(`${CONFIG.movieWatchlist.apiUrl}?apikey=${CONFIG.movieWatchlist.apiKey}&i=${id}`)
        const data = await response.json()
        return data
    })
    return Promise.all(filmData)
}
