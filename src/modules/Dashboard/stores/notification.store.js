// Core
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('dashboard-notification-stores', {
  state: () => ({
    tempData: [
      {
        id: 1,
        title: 'Bugun ishga kech qoldingiz',
        time: '09:56, 23-sentyabr',
        buttonLabel: 'Sababini ko\'rsating',
        icon: '/images/dashboard/alarm-clock.svg'
      },
      {
        id: 2,
        title: 'Sizda imzolash uchun xat bor',
        time: '09:56, 23-sentyabr',
        buttonLabel: 'Imzolash',
        icon: '/images/dashboard/bookmark-tabs.svg'
      },
      {
        id: 3,
        title: 'Otpusk vaqtini belgilang',
        time: '09:56, 23-sentyabr',
        buttonLabel: 'Belgilash',
        icon: '/images/dashboard/palm-tree.svg'
      },
      {
        id: 4,
        title: 'Bugun ishga kech qoldingiz',
        time: '09:56, 23-sentyabr',
        buttonLabel: 'Sababini ko\'rsating',
        icon: '/images/dashboard/alarm-clock.svg'
      },
      {
        id: 5,
        title: 'Bugun ishga kech qoldingiz',
        time: '09:56, 23-sentyabr',
        buttonLabel: 'Sababini ko\'rsating',
        icon: '/images/dashboard/alarm-clock.svg'
      }
    ]
  }),
})
