<template>
  <div class="container py-12">
    <!-- Search Section -->
    <div class="text-center space-y-8">
      <div class="space-y-4">
        <h2 class="heading-xl">Discover Amazing Movies</h2>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Find your next favorite film and build your personal collection
        </p>
      </div>
      <div class="search-container">
        <Search class="search-icon" />
        <input
          v-model="searchQuery"
          @keypress.enter="searchMovies"
          type="text"
          placeholder="Search for any movie..."
          class="search-input"
          id="search-input"
          name="search"
        />
        <button @click="searchMovies" :disabled="loading" class="search-button">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </div>
    <!-- Error Message -->
    <div v-if="errorMessage" class="text-center text-red-400 py-4">
      <strong>Error:</strong> {{ errorMessage }}
    </div>
    <!-- Loading -->
    <LoadingSpinner v-if="loading" />
    <!-- Search Results -->
    <div v-else-if="searchResults.length > 0" class="space-y-8">
      <div class="text-center">
        <h3 class="heading-md mb-2">Search Results</h3>
        <p class="text-gray-400">Found {{ searchResults.length }} amazing movies for you</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="(movie, index) in searchResults"
          :key="movie.id"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <MovieCard :movie="movie" />
        </div>
      </div>
    </div>
    <!-- No Results -->
    <div v-else-if="searchQuery && !loading" class="empty-state">
      <div class="empty-state-icon">
        <Search />
      </div>
      <div class="space-y-2">
        <h3 class="empty-state-title">No movies found</h3>
        <p class="text-gray-400 text-lg">Try searching for a different movie title</p>
      </div>
    </div>
    <!-- Default State -->
    <div v-else class="empty-state">
      <div class="empty-state-icon">
        <Film />
      </div>
      <div class="space-y-2">
        <h3 class="empty-state-title">Ready to discover?</h3>
        <p class="text-gray-400 text-lg">Search for any movie to get started</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { searchMovies as apiSearchMovies } from '../services/movieApi'
import MovieCard from '../components/MovieCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { Search, Film } from 'lucide-vue-next'
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)
const errorMessage = ref('')
const searchMovies = async () => {
  if (!searchQuery.value.trim()) return
  loading.value = true
  errorMessage.value = ''
  try {
    const results = await apiSearchMovies(searchQuery.value)
    if (!Array.isArray(results)) {
      errorMessage.value = 'API did not return a valid result.'
      searchResults.value = []
    } else {
      searchResults.value = results
    }
  } catch (error) {
    errorMessage.value = error?.message || 'Error searching movies.'
    searchResults.value = []
    console.error('Error searching movies:', error)
  } finally {
    loading.value = false
  }
}
</script>
