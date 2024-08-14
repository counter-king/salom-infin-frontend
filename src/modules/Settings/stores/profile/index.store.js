// Core
import { defineStore } from 'pinia'
// Components
import {
  CurrencyDollarIcon,
  UserCheckRoundedBrokenIcon,
  UserIcon,
  UserSpeakRoundedIcon
} from '@/components/Icons'
export const profileStore = defineStore('profile-store', {
  state: () => ({
    routes: {
      title: 'Профиль',
      icon: UserIcon,
      link: 'ProfileIndex',
      children: [
        // Персональный
        {
          title: 'Персональный',
          icon: UserSpeakRoundedIcon,
          link: 'PersonalIndex'
        },
        // Рабочий
        {
          title: 'Рабочий',
          icon: UserCheckRoundedBrokenIcon,
          link: 'WorkIndex'
        },
        // Моя зарплата
        {
          title: 'Моя зарплата',
          icon: CurrencyDollarIcon,
          link: 'SalaryIndex'
        }
      ]
    },
  }),
  actions: {

  }
})
