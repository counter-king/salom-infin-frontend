// Core
import { defineStore } from 'pinia'
// services
import { fetchCreateAttendanceExceptions, fetchGetAttendanceExceptionsById, fetchGetAttendanceExceptionsList } from '../services'

export const useAttendanceExpectionsStore = defineStore("attendance-expections-store", {
  state: () => ({
    attendanceExpectionsList: [],
    createAttendanceExpectionsLoading: false,
    attendanceExpectionsListLoading: false,
    attendanceExpectionsListTotalCount: 0,
    attendanceExpectionsById: [],
    attendanceExpectionsByIdLoading: false,
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
        this.attendanceExpectionsListTotalCount = res.data.count
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.attendanceExpectionsListLoading = false
      }
    },
    async getAttendanceExceptionsById(id) {
      try {
        this.attendanceExpectionsByIdLoading = true
        const res = await fetchGetAttendanceExceptionsById(id)
        console.log(res.data)
        this.attendanceExpectionsById = res.data
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.attendanceExpectionsByIdLoading = false
      }
    }
  }
})