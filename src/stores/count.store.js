// Core
import { defineStore } from 'pinia'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Services
import { fetchDocumentCountList } from '@/services/count.service'

export const useCountStore = defineStore('count-store', {
  state: () => ({}),
  actions: {
    async actionCountList(){
      const { data } = await fetchDocumentCountList()
      const { boxes } = data

      this.actionSetBoxesCount(boxes)
    },
    /**
     *
     *
     * */
    actionSetBoxesCount(boxes) {
      const themeStore = useThemeStore()
      const eDocs = themeStore.header.find(route => route.name === 'document')
      const boxesStore = useBoxesCommonStore()

      Object.keys(boxes).map(key => {
        let route = boxesStore.routes.children.find(route => route.name === key)

        route ? route.count = boxes[key] : boxesStore.routes.count = eDocs.count = boxes.all
      })
    }
  }
})
