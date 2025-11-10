// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetTableListByMonth } from "@/modules/HR/modules/TimesheetSystem/services"

export const useTableSystemStore = defineStore("tableSystem", {
  state:() => ({
    list: [],
    listLoading: false,
    totalCount: 0,
    buttonLoading: false,
    tableListByMonth: [],
    selectedItems: [],
    headers: [
      {
        header: "table-date",
        field: "date",
        active: true
      },
      {
        header: "structural-division",
        field: "structural_division",
        active: true
      },
      {
        header: "approved-leader",
        field: "approved_leader",
        active: true
      },
      {
        header: "approved-date",
        field: "approved_date",
        active: true
      },
      {
        header: "table-status",
        field: "table_status",
        active: true
      },
    ],
    filterItems: [
      {
        id: 1,
        title: "for-review",
        value: "in_review",
        count: 5,
        active: true
      },
      {
        id: 2,
        title: "rejected",
        value: "rejected",
        count: null,
        active: false
      },
      {
        id: 3,
        title: "confirmed",
        value: "approved",
        count: null,
        active: false
      }
    ]
  }),
  actions: {
    async actionGetTableListByMonth(params = {}) {
      this.listLoading = true
      try {
        const { data } = await fetchGetTableListByMonth({
          year: 2025,
          month: 11
        })
        this.tableListByMonth = data.results
      } catch (error) {}
      finally {
        this.listLoading = false
      }
    },
    /** **/

  }
})
