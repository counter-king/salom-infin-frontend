// Core
import { defineStore } from 'pinia'
// services
import { fetchCreateAttendanceExceptions, fetchGetAttendanceExceptionsList } from '../services'

export const useAttendanceExpectionsStore = defineStore("attendance-expections-store", {
  state: () => ({
    attendanceExpectionsList: [],
    createAttendanceExpectionsLoading: false,
    formModelList: [],
    formModel: {
      reason: "",
      note: "",
      __attachments: []
    }
  }),
  actions: {
    /** **/
    async createAttendanceReason(body) {
      try {
        this.createAttendanceReasonLoading = true
        const res = await fetchCreateAttendanceExceptions(body)
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.createAttendanceReasonLoading = false
      }
    },
    async getAttendanceExceptionsList(params) {
      try {
        this.attendanceExpectionsListLoading = true
        const res = await fetchGetAttendanceExceptionsList(params)
        this.attendanceExpectionsList = res.data.results
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.attendanceExpectionsListLoading = false
      }
    }
  }
})