import { DURATION } from "./constants"

// Проверка ответа сервера
export const handleSendingRequest = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Определение короткометражки:
export function findShortMovie(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.includes(userQuery) || movieEn.includes(userQuery)
    )
  })
  return moviesQuery
}

// Определение длительности:
export function filterByDuration(movies) {
  return movies.filter((movie) => movie.duration < DURATION)
}

// Пересчет на часы и минуты:
export function durationTransformer(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}

