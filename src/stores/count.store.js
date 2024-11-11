// Core
import { defineStore } from 'pinia'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Services
import {
  fetchDocumentCountList,
  fetchDashboardCountList
} from '@/services/count.service'

export const useCountStore = defineStore('count-store', {
  state: () => ({}),
  actions: {
    async actionCountList(){
      const { data } = await fetchDocumentCountList()
      const { boxes } = data
      const { data: dashboard } = await fetchDashboardCountList()

      this.actionSetBoxesCount(boxes)
      this.actionSetDashboardCount(dashboard)
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
    },
    /**
     *
     *
     * */
    actionSetDashboardCount(data) {
      const themeStore = useThemeStore()
      const dashboard = themeStore.header.find(route => route.name === 'dashboard')
      dashboard.count = Object.values(data).reduce((acc, cur) => acc + cur, 0)
    }
  }
})
