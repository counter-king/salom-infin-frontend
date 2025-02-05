// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchUserLogin,
  fetchCurrentUser,
  fetchCurrentUserUpdate,
  fetchUpdateUserAvatar,
  fetchDeleteUserAvatar,
  fetchLoginWithAd,
  fetchLoginViaERI
} from "../services/index"
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
      saveStorageItem(EXPIRES, response.data.expires_in)
    },
    /*
    *
    * */
    async loginWithAd(payload) {
      const { response, error } = await withAsync(fetchLoginWithAd, payload)

      if(error) return Promise.reject(error.data)
      saveStorageItem(ACCESS, response.data.access)
      saveStorageItem(REFRESH, response.data.refresh)
      saveStorageItem(EXPIRES, response.data.expires_in)
    },
    /** **/
    async actionLoginViaERI(payload) {
      const { response, error } = await withAsync(fetchLoginViaERI, payload)

      if(error) return Promise.reject(error.data)
      saveStorageItem(ACCESS, response.data.access)
      saveStorageItem(REFRESH, response.data.refresh)
      saveStorageItem(EXPIRES, response.data.expires_in)
      return Promise.resolve(response)
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
    async actionCurrentUserUpdate(body) {
      await fetchCurrentUserUpdate(body)
      await this.actionUserProfile()
    },
    /**
     *
     * */
    async actionUpdateUserAvatar(body) {
      await fetchUpdateUserAvatar(body)
      await this.actionUserProfile()
    },
    /**
     *
     * */
    async actionDeleteUserAvatar(id) {
      await fetchDeleteUserAvatar(id)
      await this.actionUserProfile()
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
