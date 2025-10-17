import { defineStore } from 'pinia'
import {
  fetchCreateWorkSchedule, fetchDeleteWorkSchedule,
  fetchGetWorkScheduleList,
  fetchUpdateWorkSchedule
} from "@/modules/HR/modules/Attendance/services"

export const useWorkScheduleSettingStore = defineStore('workSchedule-store', {
  state:() => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    buttonLoading: false,
    workScheduleList: [],
    updatingId: null,
    deletingId: null,
    deleteButtonLoading: false,
    headers: [
      {
        header: "name",
        field: "name",
        active: true
      },
      {
        header: "start-time",
        field: "start_time",
        active: true
      },
      {
        header: "end-time",
        field: "end_time",
        active: true
      },
      {
        header: "status",
        field: "is_default",
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
    async actionGetWorkScheduleList(params) {
      try {
        this.listLoading = true
        const { data } = await fetchGetWorkScheduleList(params)
        this.workScheduleList = data.results
        this.totalCount = data.count
      } catch (error) {}
      finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionCreateWorkSchedule(model) {
      this.buttonLoading = true
      try {
        await fetchCreateWorkSchedule(model)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionUpdateWorkSchedule(model) {
      this.buttonLoading = true
      try {
        await fetchUpdateWorkSchedule(model)
        return Promise.resolve()
      }  catch (error) {
        return Promise.reject(error)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionDeleteWorkSchedule() {
      this.deleteButtonLoading = true
      try {
        await fetchDeleteWorkSchedule(this.deletingId)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.deleteButtonLoading = false
      }
    },
    /** **/
    actionResetHeaders() {
      this.headers = [
        {
          header: "name",
          field: "name",
          active: true
        },
        {
          header: "start-time",
          field: "start_time",
          active: true
        },
        {
          header: "end-time",
          field: "end_time",
          active: true
        },
        {
          header: "status",
          field: "is_default",
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
