<template>
  <div
    :class="['movie-card', { hovered: isHovered }]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Poster Section -->
    <div class="movie-poster">
      <!-- Movie Poster or Placeholder -->
      <div v-if="movie.poster_path" class="w-full h-full">
        <img
          :src="`${IMAGE_BASE_URL}${movie.poster_path}`"
          :alt="movie.title"
          class="movie-poster img"
        />
      </div>
      <div v-else class="poster-placeholder">
        <div class="poster-placeholder-content">
          <Film />
          <div class="text-lg font-bold mb-2">{{ movie.title }}</div>
          <div class="text-sm opacity-80">Poster Coming Soon</div>
        </div>
      </div>

      <!-- Hover overlay -->
      <div class="poster-overlay">
        <div class="play-button">
          <Play />
        </div>
      </div>

      <!-- Rating Badge -->
      <div class="rating-badge">
        <Star class="w-4" />
        <span>{{ movie.vote_average }}</span>
      </div>

      <!-- Genre badges -->
      <div class="genre-badges">
        <span class="genre-badge">Action</span>
        <span class="genre-badge">Sci-Fi</span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="movie-content">
      <div class="mb-4">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-overview">{{ movie.overview }}</p>

        <div class="movie-meta">
          <div class="meta-item">
            <Calendar class="w-4" />
            <span>{{ releaseYear }}</span>
          </div>
          <div class="meta-item">
            <TrendingUp class="w-4" />
            <span>Popular</span>
          </div>
        </div>
      </div>

      <!-- Watchlist Controls -->
      <div v-if="isInWatchlist" class="space-y-4">
        <!-- Status buttons -->
        <div class="status-controls">
          <button
            @click="updateStatus('to-watch')"
            :class="['btn', 'btn-secondary', { active: movie.status === 'to-watch' }]"
          >
            <Clock class="w-4" />
            <span>To Watch</span>
          </button>
          <button
            @click="updateStatus('watched')"
            :class="['btn', 'btn-secondary', 'btn-green', { active: movie.status === 'watched' }]"
          >
            <Eye class="w-4" />
            <span>Watched</span>
          </button>
        </div>

        <!-- Rating section -->
        <div class="rating-section">
          <div class="rating-label">My Rating:</div>
          <StarRating :rating="movie.myRating" @rate="updateRating" size="large" />
        </div>

        <!-- Remove button -->
        <button @click="removeMovie" class="btn btn-danger w-full">
          <Trash2 class="w-5" />
          <span>Remove from Watchlist</span>
        </button>
      </div>

      <!-- Add to Watchlist button -->
      <button
        v-else
        @click="addMovie"
        :disabled="isInUserWatchlist"
        :class="['btn', 'w-full', isInUserWatchlist ? 'btn-disabled' : 'btn-primary']"
      >
        <Plus class="w-5" />
        <span>
          {{ isInUserWatchlist ? 'Already in Watchlist' : 'Add to Watchlist' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieStore } from '../stores/movieStore'
import { Star, Plus, Trash2, Eye, Clock, Film, TrendingUp, Play, Calendar } from 'lucide-vue-next'
import StarRating from './StarRating.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  isInWatchlist: {
    type: Boolean,
    default: false,
  },
})

const movieStore = useMovieStore()
const isHovered = ref(false)

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

const releaseYear = computed(() => {
  return new Date(props.movie.release_date).getFullYear()
})

const isInUserWatchlist = computed(() => {
  return movieStore.watchlist.some((item) => item.id === props.movie.id)
})

const addMovie = () => {
  movieStore.addToWatchlist(props.movie)
}

const removeMovie = () => {
  movieStore.removeFromWatchlist(props.movie.id)
}

const updateStatus = (status) => {
  movieStore.updateMovieStatus(props.movie.id, status)
}

const updateRating = (rating) => {
  movieStore.updateMovieRating(props.movie.id, rating)
}
</script>
