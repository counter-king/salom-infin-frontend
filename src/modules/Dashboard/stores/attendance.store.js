// Core
import { defineStore } from 'pinia'
// Service
import { fetchDashboardAttendanceList } from "@/modules/Dashboard/services/index.service"

export const useAttendanceStore = defineStore('dashboard-attendance-stores', {
  state: () => ({
    listLoading: false,
    attendanceList: [],
  }),
  actions: {
    async actionDashboardAttendanceList() {
      try {
        this.listLoading = true
        const res = await fetchDashboardAttendanceList()
        this.attendanceList = res?.data?.results
      } catch (error) {}
      finally {
        this.listLoading = false
      }
    }
  }
})
