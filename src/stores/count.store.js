// Core
import { defineStore } from 'pinia'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
import { useAgreementsRoutesStore } from '@/modules/HR/modules/Agreements/stores/routes.store'
// Services
import { fetchDocumentCountList } from '@/services/count.service'
import { fetchGetNewsPendingCount } from '@/modules/News/services/news.service'

export const useCountStore = defineStore('count-store', {
  state: () => ({}),
  actions: {
    async actionCountList(){
      const { data } = await fetchDocumentCountList()
      const { boxes, hr } = data

      this.actionSetBoxesCount(boxes)
      this.actionSetAgreementsCount(hr)

      const { data: dataNews } = await fetchGetNewsPendingCount()
      this.actionSetNewsCount(dataNews)
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
    actionSetAgreementsCount(counts) {
      const themeStore = useThemeStore()
      const hr = themeStore.header.find(route => route.name === 'hr')
      const agreementsStore = useAgreementsRoutesStore()

      hr.count = counts.unread_negotiator
      agreementsStore.routes.count = counts.unread_negotiator
    },
    /**
     *
     *
     * */
    actionSetNewsCount(counts){
      const themeStore = useThemeStore()
      const news = themeStore.header.find(route => route.name === 'news')

      news.count = counts?.count
    }
  }
})
