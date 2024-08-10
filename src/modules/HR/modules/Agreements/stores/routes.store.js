// Core
import { defineStore } from 'pinia'

export const useAgreementsRoutesStore = defineStore('agreements-routes-store', {
  state: () => ({
    routes: {
      title: 'Согласия',
      icon: 'InboxUnreadIcon',
      link: 'AgreementsIndex',
      children: [
        {
          title: 'Неподписанный',
          icon: 'InboxUnreadIcon',
          link: 'AgreementNotSigned',
          count: 7
        },
        {
          title: 'Подписанный',
          icon: 'InboxUnreadIcon',
          link: 'AgreementSigned',
        }
      ]
    }
  }),
  actions: {

  }
})
