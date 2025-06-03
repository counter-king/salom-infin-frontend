import { defineStore } from 'pinia';

export const useStateStore = defineStore("state-store", {
  state: () => ({
    generalList: [
      {
        date: '2025-06-01',
        week_days: 'Понедельник',
        status: 'Заполнено'
      }
    ],
    generalHeaders: [
      {
        header: 'Дата',
        field: 'date',
        active: true
      },
      {
        header: 'Дни недели',
        field: 'week_days',
        active: true
      },
      {
        header: 'Статус',
        field: 'status',
        active: true
      }
    ],
    generalTotalCount: 0,
    generalLoading: false
  }),
  actions: {
    
  }
})
