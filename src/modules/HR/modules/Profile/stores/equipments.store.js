// Core
import { defineStore } from 'pinia'
// Service
import { fetchEquipment } from '../services/equipments.service'

export const useEquipmentStore = defineStore('equipment-stores', {
  state: () => ({
    list: [],
    headers: [
      {
        header: 'ID',
        field: 'card_id',
        active: true
      },
      {
        header: 'Название техники',
        field: 'name',
        active: true
      },
      {
        header: 'ИНВ',
        field: 'inv_num',
        active: true
      },
      {
        header: 'Дата ввода',
        field: 'date_oper',
        active: true
      },
    ],
    count: 0,
    contentLoading: false
  }),
  actions: {
    async getEquipment(params) {
      try {
        this.contentLoading = true

        let { data } = await fetchEquipment(params)
        this.list = data.results
        this.count = data.count
        return Promise.resolve()
      }
      catch (error) {
        return Promise.reject()
      }
      finally {
        this.contentLoading = false
      }
    }
  }
})
