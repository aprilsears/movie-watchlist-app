export const getMovieVideos = async (movieId) => {
  try {
    const response = await movieApi.get(`/movie/${movieId}/videos`)
    console.log('getMovieVideos raw response:', response.data)
    console.log('getMovieVideos results:', response.data.results)
    return response.data.results
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    return []
  }
}
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const searchMovies = async (query) => {
  try {
    const response = await movieApi.get('/search/movie', {
      params: { query },
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}

export const getPopularMovies = async () => {
  try {
    const response = await movieApi.get('/movie/popular')
    return response.data.results
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

export default movieApi
