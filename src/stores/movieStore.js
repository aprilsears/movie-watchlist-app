import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMovieStore = defineStore('movies', () => {
  const watchlist = ref([])
  const searchResults = ref([])
  const loading = ref(false)

  const toWatchMovies = computed(() =>
    watchlist.value.filter((movie) => movie.status === 'to-watch'),
  )

  const watchedMovies = computed(() =>
    watchlist.value.filter((movie) => movie.status === 'watched'),
  )

  const averageRating = computed(() => {
    const ratedMovies = watchlist.value.filter((m) => m.myRating > 0)
    if (ratedMovies.length === 0) return 0
    return (ratedMovies.reduce((acc, m) => acc + m.myRating, 0) / ratedMovies.length).toFixed(1)
  })

  const addToWatchlist = (movie) => {
    if (watchlist.value.find((item) => item.id === movie.id)) return

    const movieWithStatus = {
      ...movie,
      status: 'to-watch',
      myRating: 0,
      dateAdded: new Date().toISOString(),
    }
    watchlist.value.push(movieWithStatus)
    saveWatchlist()
  }

  const removeFromWatchlist = (movieId) => {
    watchlist.value = watchlist.value.filter((movie) => movie.id !== movieId)
    saveWatchlist()
  }

  const updateMovieStatus = (movieId, status) => {
    const movie = watchlist.value.find((m) => m.id === movieId)
    if (movie) {
      movie.status = status
      saveWatchlist()
    }
  }

  const updateMovieRating = (movieId, rating) => {
    const movie = watchlist.value.find((m) => m.id === movieId)
    if (movie) {
      movie.myRating = rating
      saveWatchlist()
    }
  }

  const saveWatchlist = () => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist.value))
  }

  const loadWatchlist = () => {
    const saved = localStorage.getItem('movieWatchlist')
    if (saved) {
      watchlist.value = JSON.parse(saved)
    }
  }

  return {
    watchlist,
    searchResults,
    loading,
    toWatchMovies,
    watchedMovies,
    averageRating,
    addToWatchlist,
    removeFromWatchlist,
    updateMovieStatus,
    updateMovieRating,
    loadWatchlist,
  }
})
