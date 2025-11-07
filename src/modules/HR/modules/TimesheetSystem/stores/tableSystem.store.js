// Core
import { defineStore } from 'pinia'

export const useTableSystemStore = defineStore("tableSystem", {
  state:() => ({
    list: [],
    listLoading: false,
    totalCount: 0,
    buttonLoading: false,
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
    ]
  })
})
