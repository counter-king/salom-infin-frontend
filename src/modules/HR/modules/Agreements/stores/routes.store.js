// Core
import { defineStore } from 'pinia'
// Components
import { NotebookIcon, DangerCircleIcon, CheckCircleIcon } from '@/components/Icons'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useAgreementsStore } from './agreements.store'
export const useAgreementsRoutesStore = defineStore('agreements-routes-store', {
  state: () => ({
    routes: {
      title: 'Согласия',
      icon: NotebookIcon,
      link: 'AgreementsIndex',
      count: null,
      name: 'agreements',
      children: [
        {
          title: 'Неподписанный',
          icon: DangerCircleIcon,
          link: 'AgreementNotSigned',
          count: null,
          name: 'not-signed'
        },
        {
          title: 'Подписанный',
          icon: CheckCircleIcon,
          link: 'AgreementSigned',
          name: 'signed'
        }
      ]
    }
  }),
  actions: {
    async setCounts() {
      const themeStore = useThemeStore()
      const agreementsStore = useAgreementsStore()

      await agreementsStore.getNegotiationTypes()

      let allNotSignedCunts = agreementsStore.negotiationTypes.reduce(
        (acc, cur) => acc + cur.docs_count_to_sign, 0
      )
      let hrCount = themeStore.header.find(route => route.name === 'hr')
      let notSignedCount = this.routes.children.find(route => route.name === 'not-signed')
      hrCount.count = this.routes.count = notSignedCount.count = allNotSignedCunts
    }
  }
})
