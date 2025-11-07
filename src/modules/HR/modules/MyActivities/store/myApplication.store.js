// Core
import { defineStore } from 'pinia'
// services
import { fetchGetAttendanceExceptionsList } from '../services'

export const useMyApplicationStore = defineStore("my-application-store", {
  state: () => ({
    attendanceExpectionsList: [],
    attendanceExpectionsListTotalCount: 0,
    attendanceExpectionsListLoading: false,
    currentHeaders: [
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "reason-for-explanation",
        field: "kind",
        active: true
      },
      {
        header: "reason",
        field: "reason",
        active: true
      },
      {
        header: "reason-entered-time",
        field: "created_date",
        active: true
      },
      {
        header: "current-status",
        field: "status",
        active: true
      }
    ],
    archiveHeaders: [
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "reason-for-explanation",
        field: "kind",
        active: true
      },
      {
        header: "reason",
        field: "reason",
        active: true
      },
      {
        header: "reason-entered-time",
        field: "created_date",
        active: true
      },
      {
        header: "current-status",
        field: "status",
        active: true
      }
    ]
  }),
  actions: {
    /** **/
    async getAttendanceExceptionsList(params) {
      try {
        this.attendanceExpectionsListLoading = true
        const res = await fetchGetAttendanceExceptionsList(params)
        this.attendanceExpectionsList = res.data.results
        this.attendanceExpectionsListTotalCount = res.data.count
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.attendanceExpectionsListLoading = false
      }
    }

  }
})