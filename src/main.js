import './assets/css/main.css'
// Core
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupI18n } from "@/i18n"
// Plugins
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/lara-light-indigo/theme.css"
// Router
import router from './router'
// Components
import App from './App.vue'
import { registerComponents } from "./components/UI/register"

const app = createApp(App)
registerComponents(app)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(setupI18n())

app.mount('#app')
