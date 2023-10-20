import { defineStore } from "pinia"
// Utils
import { saveStorageItem, getStorageItem } from "@/utils/storage"
import { CURRENT_ROUTE } from "@/constants/storage"
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
      saveStorageItem(CURRENT_ROUTE, JSON.stringify(payload))

      setTimeout(() => {
        this.currentMenuLoading = false
      }, 300)
    },
    /*
    *
    * */
    actionCurrentMenuSet() {
      this.currentMenu = JSON.parse(getStorageItem(CURRENT_ROUTE)) ?? this.currentMenu
      setTimeout(() => {
        this.currentMenuLoading = false
      }, 300)
    }
  }
})
