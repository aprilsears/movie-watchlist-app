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
            <p class="app-subtitle">Movies to Watch and Review</p>
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
        <router-link to="/search" class="nav-button" active-class="active">
          <Search />
          <span>Discover Movies</span>
        </router-link>
        <router-link to="/watchlist" class="nav-button" active-class="active">
          <Award />
          <span>My Collection</span>
        </router-link>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useMovieStore } from './stores/movieStore'
import { Search, Film, Heart, Award } from 'lucide-vue-next'

const movieStore = useMovieStore()
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
