// Core
import { defineStore } from "pinia"
export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    sidebarCollapse: false
  }),
  actions: {
    actionSidebarCollapse(payload) {
      this.sidebarCollapse = payload
    }
  }
})
