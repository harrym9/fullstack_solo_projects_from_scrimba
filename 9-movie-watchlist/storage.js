function addFilmToWatchlist(film) {
    const filmToSave = {
        title: film.Title,
        poster: film.Poster,
        runtime: film.Runtime,
        genre: film.Genre,
        plot: film.Plot,
        rating: film.imdbRating,
        id: film.imdbID,
    }
    const existingFilms = getData()
    const doesFilmExist = existingFilms.some(f => f.id === filmToSave.id)
    if (!doesFilmExist) {
        existingFilms.push(filmToSave)
        setData(existingFilms)
    }
}

function getWatchlist() {
    return getData()
}

function isInWatchlist(filmId) {
    return getData().some(film => film.id === filmId)
}

function removeFilmFromWatchlist(filmId) {
    const existingFilms = getData()
    if (existingFilms.some(film => film.id === filmId)) {
        const updatedFilms = existingFilms.filter(film => film.id !== filmId)
        setData(updatedFilms)
    }
}

function getData() {
    try {
        const parsed = JSON.parse(localStorage.getItem("films"))
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function setData(data) {
    localStorage.setItem("films", JSON.stringify(data))
}

export { addFilmToWatchlist, getWatchlist, isInWatchlist, removeFilmFromWatchlist }
