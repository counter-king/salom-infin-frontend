// Core
import { defineStore } from 'pinia'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useBoxesCommonStore } from '../modules/Boxes/stores/common.store'
// Services
import { fetchDocumentCountList } from '../services/count.service'
export const useDocumentCountStore = defineStore("document-count", {
  state: () => ({}),
  actions: {
    async actionDocumentCountList() {
      const themeStore = useThemeStore()
      const boxesStore = useBoxesCommonStore()
      let { data } = await fetchDocumentCountList()

      Object.entries(data.boxes).map(([key, value]) => {
        let route = boxesStore.routes.children.find(route => route.name === key)

        if(route) {
          route.count = data.boxes[key]
          boxesStore.routes.count = boxesStore.routes.count + value
        }
        else {
          let document = themeStore.header?.find(header => header.name === 'document')
          document.count = value
        }
      })
    }
  }
})
