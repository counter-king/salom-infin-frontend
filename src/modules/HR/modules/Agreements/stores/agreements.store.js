// Core
import { defineStore } from 'pinia'
// Services
import { fetchNegotiationTypes } from '../services'

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
    negotiationTypes: []
  }),
  actions: {
    async getNegotiationTypes() {
      try {
        let { data } = await fetchNegotiationTypes()
        this.negotiationTypes = data.results
      }
      catch(error) {

      }
    }
  }
})
