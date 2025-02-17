// Core
import { defineStore } from 'pinia'
import { fetchBlobFile } from "@/services/file.service";

export const useBlobFileStore = defineStore("file-blob", {
  state: () => ({
    loading: true
  }),
  actions: {
    async actionGetBlobFile(id) {
      try {
        this.loading = true
        const blobFile = await fetchBlobFile(id)
        return Promise.resolve(blobFile)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = false
      }
    }
  }
})
