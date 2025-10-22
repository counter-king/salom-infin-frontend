import { defineStore } from 'pinia'
import {
  fetchGetAttendanceReasonsList,
  fetchCreateAttendanceReason,
  fetchUpdateAttendanceReason,
  fetchDeleteAttendanceReason,
} from "@/modules/HR/modules/Attendance/services"

export const useAttendanceReasonStore = defineStore("attendance-reasons-store", {
  state:() => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    buttonLoading: false,
    attendanceReasonList: [],
    updatingId: null,
    deletingId: null,
    deleteButtonLoading: false,
    headers: [
      {
        header: "name-uz",
        field: "name_uz",
        active: true
      },
      {
        header: "name-ru",
        field: "name_ru",
        active: true
      },
      {
        header: "status",
        field: "is_active",
        active: true
      },
      {
        header: "actions",
        field: "action",
        active: true
      }
    ],
  }),
  actions: {
    async actionGetAttendanceReasonList(params) {
      try {
        this.listLoading = true
        const { data } = await fetchGetAttendanceReasonsList(params)
        this.attendanceReasonList = data.results
        this.totalCount = data.count
      } catch (error) {
      } finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionCreateAttendanceReason(model) {
      this.buttonLoading = true
      try {
        await fetchCreateAttendanceReason(model)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionUpdateAttendanceReason(model) {
      this.buttonLoading = true
      try {
        await fetchUpdateAttendanceReason(model)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionDeleteAttendanceReason() {
      this.deleteButtonLoading = true
      try {
        await fetchDeleteAttendanceReason(this.deletingId)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.deleteButtonLoading = false
      }
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "name-uz",
          field: "name_uz",
          active: true
        },
        {
          header: "name-ru",
          field: "name_ru",
          active: true
        },
        {
          header: "status",
          field: "is_active",
          active: true
        },
        {
          header: "actions",
          field: "action",
          active: true
        }
      ]
    }
  }
})
