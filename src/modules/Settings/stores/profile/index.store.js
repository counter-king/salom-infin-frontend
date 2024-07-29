// Core
import { defineStore } from 'pinia'

export const profileStore = defineStore('profile-store', {
  state: () => ({
    routes: {
      title: 'Профиль',
      icon: 'UserIcon',
      link: 'ProfileIndex',
      children: [
        // Персональный
        {
          title: 'Персональный',
          icon: 'TimeHistoryIcon',
          link: 'PersonalIndex'
        },
        // Рабочий
        {
          title: 'Рабочий',
          icon: 'TimeHistoryIcon',
          link: 'WorkIndex'
        },
        // Моя зарплата
        {
          title: 'Моя зарплата',
          icon: 'TimeHistoryIcon',
          link: 'SalaryIndex'
        }
      ]
    },
  }),
  actions: {

  }
})
