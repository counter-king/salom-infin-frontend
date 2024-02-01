// Core
import { defineStore } from 'pinia'
// Stores
import { useBoxesCommonStore } from '../modules/Boxes/stores/common.store'
// Services
import { fetchDocumentCountList } from '../services/count.service'
export const useDocumentCountStore = defineStore("document-count", {
  state: () => ({}),
  actions: {
    async actionDocumentCountList() {
      const boxesStore = useBoxesCommonStore()
      let { data } = await fetchDocumentCountList()

      Object.keys(data.boxes).map(key => {
        let route = boxesStore.routes.children.find(route => route.name === key)

        route ? route.count = data.boxes[key] : boxesStore.routes.count = data.boxes.all
      })
    }
  }
})
