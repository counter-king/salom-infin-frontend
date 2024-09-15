// Core
import { defineStore } from 'pinia'
// Service
import { fetchAllUrls } from '@/services/all-urls.service'

export const useAllUrlStore = defineStore('all-url-store', {
  state: () => ({
    list: []
  }),
  actions: {
    /**
     * Получить список апи пути
     * */
    async getAllUrls() {
      let { data } = await fetchAllUrls()
      this.list = data
    }
  }
})

