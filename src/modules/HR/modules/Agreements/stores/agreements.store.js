// Core
import { defineStore } from 'pinia'

export const useAgreementsStore = defineStore('agreements-store', {
  state: () => ({
    headers: [
      {
        header: 'Название документа',
        field: 'name',
        active: true
      },
      {
        header: 'Статус',
        field: 'status',
        active: true
      },
      {
        header: 'Дата',
        field: 'date',
        active: true
      },
    ],
    notSignedList: [],
    notSignedCount: 0,
    signedList: [],
  }),
  actions: {

  }
})
