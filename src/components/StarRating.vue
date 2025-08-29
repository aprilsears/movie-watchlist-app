<template>
  <div class="star-rating">
    <Star
      v-for="star in 5"
      :key="star"
      :class="[
        'star',
        sizeClass,
        {
          interactive: interactive,
          filled: star <= (hoverRating || rating),
        },
      ]"
      @click="() => handleClick(star)"
      @mouseenter="() => handleMouseEnter(star)"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Star } from 'lucide-vue-next'

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: 'normal',
  },
  interactive: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['rate'])

const hoverRating = ref(0)

const sizeClass = computed(() => {
  return props.size === 'large' ? 'large' : ''
})

const handleClick = (star) => {
  if (props.interactive) {
    emit('rate', star)
  }
}

const handleMouseEnter = (star) => {
  if (props.interactive) {
    hoverRating.value = star
  }
}

const handleMouseLeave = () => {
  if (props.interactive) {
    hoverRating.value = 0
  }
}
</script>
