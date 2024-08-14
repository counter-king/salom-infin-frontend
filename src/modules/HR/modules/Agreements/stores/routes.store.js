// Core
import { defineStore } from 'pinia'
// Components
import { NotebookIcon, DangerCircleIcon, CheckCircleIcon } from '@/components/Icons'
export const useAgreementsRoutesStore = defineStore('agreements-routes-store', {
  state: () => ({
    routes: {
      title: 'Согласия',
      icon: NotebookIcon,
      link: 'AgreementsIndex',
      children: [
        {
          title: 'Неподписанный',
          icon: DangerCircleIcon,
          link: 'AgreementNotSigned',
          count: 7
        },
        {
          title: 'Подписанный',
          icon: CheckCircleIcon,
          link: 'AgreementSigned',
        }
      ]
    }
  }),
  actions: {

  }
})
