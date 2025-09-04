<template>
  <div class="container py-12">
    <div class="text-center space-y-4">
      <h2 class="heading-xl">My Movie Collection</h2>
      <p class="text-lg text-gray-400">
        {{ movieStore.watchlist.length }} movies in your personal vault
      </p>
    </div>
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
    <div v-if="movieStore.watchlist.length > 0" class="space-y-12">
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
        <router-link to="/search" class="btn btn-primary">Discover Movies</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import MovieCard from '../components/MovieCard.vue'
import { Award, Clock, Eye, Star } from 'lucide-vue-next'
const movieStore = useMovieStore()
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
</script>
