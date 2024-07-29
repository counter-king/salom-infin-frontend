// Core
import { defineStore } from 'pinia'

export const salaryStore = defineStore('salary-store', {
  state: () => ({
    list: [
      {
        salary_date: 1,
        naming: 1222,
        tax: 1333,
        total_sum: 144444,
        on_hand: 15555555
      },
      {
        salary_date: 2,
        naming: 2222,
        tax: 3333,
        total_sum: 4444,
        on_hand: 5555
      }
    ],
    headers: [
      {
        header: 'Дата зарплаты',
        field: 'salary_date',
        active: true
      },
      {
        header: 'Наименование',
        field: 'naming',
        active: true
      },
      {
        header: 'Налог',
        field: 'tax',
        active: true
      },
      {
        header: 'Общая сумма',
        field: 'total_sum',
        active: true
      },
      {
        header: 'В руки',
        field: 'on_hand',
        active: true
      },
    ],
    listLoading: false,
    totalCount: 0
  }),
  actions: {

  }
})
