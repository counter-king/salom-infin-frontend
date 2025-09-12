// Core
import { defineStore } from 'pinia'

export const useAttendanceStore = defineStore('dashboard-attendance-store', {
  state: () => ({
    tabItems: [
      {
        id: 1,
        label: 'late-days',
        active: true
      },
      {
        id: 2,
        label: 'not-come-days',
        active: false
      },
      {
        id: 3,
        label: 'working-days',
        active: false
      }
    ]
  })
})
