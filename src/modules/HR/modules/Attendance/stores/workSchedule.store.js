import { defineStore } from 'pinia'

export const useWorkScheduleSettingStore = defineStore('workSchedule-store', {
  state:() => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    workScheduleList: [],
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
        header: "is-default",
        field: "is_default",
        active: true
      }
    ]
  }),
  actions: {
    async actionGetWorkScheduleList() {

    },
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
          header: "is-default",
          field: "is_default",
          active: true
        }
      ]
    }
  }
})
