import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import custom CSS
import './assets/css/main.css'
import './assets/css/components.css'
import './assets/css/animations.css'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
