import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind/tailwind.css'

const app = createApp(App);

// Create a Pinia store
const pinia = createPinia();

app.use(pinia); // Use Pinia
app.use(router); // Use Vue Router
app.mount('#app');