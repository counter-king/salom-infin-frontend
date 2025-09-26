// Core
import { defineStore } from 'pinia'
// Service
import { fetchDashboardAttendanceList } from "@/modules/Dashboard/services/index.service"

export const useAttendanceStore = defineStore('dashboard-attendance-stores', {
  state: () => ({
    listLoading: false,
    notificationAttendanceLoading: false,
    attendanceList: [],
    notificationAttendanceList: [],
  }),
  actions: {
    async actionDashboardAttendanceList(params) {
      try {
        this.listLoading = true
        const res = await fetchDashboardAttendanceList(params)
        this.attendanceList = res?.data?.results
      } catch (error) {}
      finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionDashboardNotificationAttendanceList(params) {
      try {
        this.notificationAttendanceLoading = true
        const res = await fetchDashboardAttendanceList(params)
        const today = new Date().toISOString().split("T")[0] // "YYYY-MM-DD"

        this.notificationAttendanceList = res?.data?.results.map(item => ({
          ...item,
          today: item.date === today
        }))
      } catch (error) {
      } finally {
        this.notificationAttendanceLoading = false
      }
    }
  },
})
