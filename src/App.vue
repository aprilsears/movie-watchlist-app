<template>
  <!-- Header -->
  <header class="header">
    <div class="container py-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="logo">
            <Film />
          </div>
          <div>
            <h1 class="app-title">A & A Movie Picks</h1>
            <p class="app-subtitle">Our personal movie library</p>
          </div>
        </div>

        <div class="watchlist-counter">
          <Heart class="w-5 text-red-400" />
          <span class="font-medium">{{ movieStore.watchlist.length }}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation -->
  <nav class="nav">
    <div class="container">
      <div class="flex space-x-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['nav-button', { active: activeTab === tab.id }]"
        >
          <component :is="tab.icon" />
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>
  </nav>

  <div class="container py-12">
    <!-- Search Tab -->
    <div v-if="activeTab === 'search'" class="space-y-12">
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
          />
          <button @click="searchMovies" :disabled="loading" class="search-button">
            {{ loading ? 'Searching...' : 'Search' }}
          </button>
        </div>
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

    <!-- Watchlist Tab -->
    <div v-else class="space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h2 class="heading-xl">My Movie Collection</h2>
        <p class="text-lg text-gray-400">
          {{ movieStore.watchlist.length }} movies in your personal vault
        </p>
      </div>

      <!-- Stats -->
      <div v-if="movieStore.watchlist.length > 0" class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-content">
            <div :class="['stat-icon', stat.color]">
              <component :is="stat.icon" />
            </div>
            <div>
              <div class="stat-value">{{ stat.count }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Watchlist Content -->
      <div v-if="movieStore.watchlist.length > 0" class="space-y-12">
        <!-- To Watch Section -->
        <div v-if="movieStore.toWatchMovies.length > 0" class="space-y-6">
          <div class="section-header">
            <div class="section-icon blue">
              <Clock />
            </div>
            <h3 class="section-title">Ready to Watch</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div
              v-for="(movie, index) in movieStore.toWatchMovies"
              :key="movie.id"
              class="animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <MovieCard :movie="movie" :isInWatchlist="true" />
            </div>
          </div>
        </div>

        <!-- Watched Section -->
        <div v-if="movieStore.watchedMovies.length > 0" class="space-y-6">
          <div class="section-header">
            <div class="section-icon green">
              <Eye />
            </div>
            <h3 class="section-title">Already Watched</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div
              v-for="(movie, index) in movieStore.watchedMovies"
              :key="movie.id"
              class="animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <MovieCard :movie="movie" :isInWatchlist="true" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-state-icon">
          <Award />
        </div>
        <div class="space-y-4">
          <h3 class="empty-state-title">Your collection is empty</h3>
          <p class="empty-state-description">
            Start building your personal movie vault by discovering and adding movies you want to
            watch
          </p>
          <button @click="activeTab = 'search'" class="btn btn-primary">Discover Movies</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMovieStore } from './stores/movieStore'
import { searchMovies as apiSearchMovies } from './services/movieApi'
import MovieCard from './components/MovieCard.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { Search, Film, Heart, Award, Clock, Eye, Star } from 'lucide-vue-next'

const movieStore = useMovieStore()
const activeTab = ref('search')
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)

const tabs = computed(() => [
  { id: 'search', label: 'Discover Movies', icon: Search },
  { id: 'watchlist', label: `My Collection (${movieStore.watchlist.length})`, icon: Award },
])

const stats = computed(() => [
  {
    label: 'To Watch',
    count: movieStore.toWatchMovies.length,
    icon: Clock,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Watched',
    count: movieStore.watchedMovies.length,
    icon: Eye,
    color: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Average Rating',
    count: movieStore.averageRating,
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
  },
])

const searchMovies = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  try {
    // Mock data for demo - replace with real API call
    const mockResults = [
      {
        id: 1,
        title: 'Dune: Part Two',
        poster_path: null,
        overview:
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
        release_date: '2024-03-01',
        vote_average: 8.8,
      },
      {
        id: 2,
        title: 'Oppenheimer',
        poster_path: null,
        overview:
          "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        release_date: '2023-07-21',
        vote_average: 8.4,
      },
    ].filter((movie) => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()))

    // For real API: const results = await apiSearchMovies(searchQuery.value)
    setTimeout(() => {
      searchResults.value = mockResults
      loading.value = false
    }, 800)
  } catch (error) {
    console.error('Error searching movies:', error)
    loading.value = false
  }
}

onMounted(() => {
  movieStore.loadWatchlist()
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
