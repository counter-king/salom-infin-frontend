import { defineStore } from "pinia"
export const useNavigation = defineStore("navigation", {
  state: () => ({
    currentMenu: {
      title: "Дашбоард",
      icon: "HomeAngleIcon",
      link: "DashboardIndex",
      children: [],
      value: "dashboard"
    },
    currentMenuLoading: true
  }),
  actions: {
    actionCurrentMenu(payload) {
      this.currentMenuLoading = true
      this.currentMenu = payload

      setTimeout(() => {
        this.currentMenuLoading = false
      }, 300)
    }
  }
})
