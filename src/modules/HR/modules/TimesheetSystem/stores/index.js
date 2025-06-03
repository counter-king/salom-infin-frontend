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
      {
        header: "Статус",
        field: "status",
        active: true
      },
      {
        header: "Ср",
        field: "1",
        active: true
      },
      {
        header: "Чт",
        field: "2",
        active: true
      },
      {
        header: "Пт",
        field: "3",
        active: true
      },
      {
        header: "Сб",
        field: "4",
        active: true
      },
      {
        header: "Вс",
        field: "5",
        active: true
      },
      {
        header: "Вс",
        field: "6",
        active: true
      },
      {
        header: "Вт",
        field: "7",
        active: true
      },
      {
        header: "Ср",
        field: "8",
        active: true
      },
      {
        header: "Ср",
        field: "9",
        active: true
      },
      {
        header: "Ср",
        field: "10",
        active: true
      },
      {
        header: "Ср",
        field: "11",
        active: true
      },
      {
        header: "Ср",
        field: "12",
        active: true
      },
      {
        header: "Ср",
        field: "13",
        active: true
      },
      {
        header: "Ср",
        field: "14",
        active: true
      },
      // untill 1..31
      {
        header: "Ср",
        field: "15",
        active: true
      },
      {
        header: "Ср",
        field: "16",
        active: true
      },
      {
        header: "Чт",
        field: "17",
        active: true
      },
      {
        header: "Пт",
        field: "18",
        active: true
      },
      {
        header: "Сб",
        field: "19",
        active: true
      },
      {
        header: "Вс",
        field: "20",
        active: true
      },
      {
        header: "Вс",
        field: "21",
        active: true
      },
      {
        header: "Вт",
        field: "22",
        active: true
      },
      {
        header: "Ср",
        field: "23",
        active: true
      },
      {
        header: "Ср",
        field: "24",
        active: true
      },
      {
        header: "Ср",
        field: "25",
        active: true
      },
      {
        header: "Ср",
        field: "26",
        active: true
      },
      {
        header: "Ср",
        field: "27",
        active: true
      },
      {
        header: "Ср",
        field: "28",
        active: true
      },
      {
        header: "Ср",
        field: "29",
        active: true
      },
      {
        header: "Ср",
        field: "30",
        active: true
      },
      {
        header: "Ср",
        field: "31",
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
