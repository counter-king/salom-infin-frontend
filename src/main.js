import './assets/css/main.css'
// Core
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupI18n } from "@/i18n"
// Plugins
import PrimeVue from 'primevue/config'
import BadgeDirective from 'primevue/badgedirective'
import Tooltip from 'primevue/tooltip'
import "primevue/resources/themes/lara-light-indigo/theme.css"
import 'primeicons/primeicons.css'
// Router
import router from './router'
// Components
import App from './App.vue'
import { registerComponents } from "./components/UI/register"

const app = createApp(App)
registerComponents(app).then(() => {
  app.use(createPinia())
  app.use(router)
  app.use(PrimeVue)
  app.use(setupI18n())

  app.directive('badge', BadgeDirective)
  app.directive('tooltip', Tooltip)
  app.mount('#app')
})
