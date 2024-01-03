// Core
import { defineStore } from 'pinia'
// Services
import { fetchUserLogin, fetchCurrentUser } from "../services/index"
// Utils
import { withAsync } from "@/utils/withAsync"
import { saveStorageItem } from "@/utils/storage"
import { ACCESS, REFRESH, EXPIRES } from "@/constants/storage"
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // TODO: null
    currentUser: null,
    sessionEnd: false
  }),
  getters: {
    getCurrentUser: state => state.currentUser
  },
  actions: {
    async actionUserLogin(payload) {
      const { response, error } = await withAsync(fetchUserLogin, payload)

      if(error) return Promise.reject(error.data)
      saveStorageItem(ACCESS, response.data.access)
      saveStorageItem(REFRESH, response.data.refresh)
      saveStorageItem(EXPIRES, response.data.expires)
    },
    /*
    *
    * */
    actionSessionEnd(payload) {
      this.sessionEnd = payload
    },
    /**
     *
     * */
    async actionUserProfile() {
      const { response } = await withAsync(fetchCurrentUser)
      this.currentUser = response.data
    }
  }
})
