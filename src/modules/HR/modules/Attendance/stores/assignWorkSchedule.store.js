// Core
import { defineStore } from 'pinia'
// Service
import { fetchAssignWorkSchedule, fetchAssignWorkScheduleList } from "@/modules/HR/modules/Attendance/services"

export const useAssignWorkScheduleStore = defineStore('assignSchedule', {
  state:() => ({
    list: [],
    listLoading: false,
    totalCount: 0,
    buttonLoading: false,
    headers: [
      {
        header: "employee",
        field: "employee",
        width: "20%",
        active: true
      },
      {
        header: "branch",
        field: "company",
        active: true
      },
      {
        header: "department",
        field: "department",
        width: "30%",
        active: true
      },
      {
        header: "position",
        field: "position",
        active: true
      },
      {
        header: "schedule",
        field: "schedule",
        active: true
      }
    ]
  }),
  actions: {
    async actionGetAssignWorkScheduleList(params =  {}) {
      this.listLoading = true
      try {
        const { data } = await fetchAssignWorkScheduleList(params)
        this.list = data.results
        this.totalCount = data.count
        await Promise.resolve(data)
      } catch (error) {
        await Promise.reject(error)
      } finally {
        this.listLoading = false
      }

    },
    /** **/
    async actionAssignWorkSchedule(body) {
      this.buttonLoading = true
      try {
        await fetchAssignWorkSchedule(body)
        await Promise.resolve()
      } catch (error) {
        await Promise.reject(error)
      }  finally {
        this.buttonLoading = false
      }
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "employee",
          field: "employee",
          width: "20%",
          active: true
        },
        {
          header: "branch",
          field: "company",
          active: true
        },
        {
          header: "department",
          field: "department",
          width: "30%",
          active: true
        },
        {
          header: "position",
          field: "position",
          active: true
        },
        {
          header: "schedule",
          field: "schedule",
          active: true
        }
      ]
    }
  }
})
