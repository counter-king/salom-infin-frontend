// Core
import { defineStore } from 'pinia'

export const useMyAttendanceStore = defineStore("my-attendance-store", {
  state: () => ({
    myAttendanceList: [],
    myAttendanceTotalCount: 0,
    myAttendanceListLoading: false,
    headers: [
      {
        header: "Дата",
        field: "date",
        active: true
      },
      {
        header: "Дни недели",
        field: "week_days",
        active: true
      },
    ]
  }),
  actions: {
    /** **/
    async actionGetMyAttendanceList(params) {

    },

  }
})
