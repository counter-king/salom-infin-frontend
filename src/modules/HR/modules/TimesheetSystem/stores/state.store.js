import { defineStore } from 'pinia';

export const useStateStore = defineStore("state-store", {
  state: () => ({
    generalList: [
     ...Array.from({ length: 5 }, (_, i) => ({
        employee: '2025-06-01',
        division: 'Понедельник',
        position: 'Должность',
        "1":1,
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "10":10,
        "11":11,
        "12":12,
        "13":13,
        "14":14,
        "15":15,
        "16":16,
        "17":17,
        "18":18,
        "19":19,
        "20":20,
        "21":21,
        "22":22,
        "23":23,
        "24":24,
        "25":25,
        "26":26,
        "27":27,
        "28":28,
        "29":29,
        "30":30,
        "31":31,
      }))
    ],

    generalHeaders: [
      {
        header: 'Сотрудник',
        field: 'employee',
        active: true,
        width: '30%'
      },
      {
        header: 'Подразделение',
        field: 'division',
        active: true,
        width: '30%'
      },
      {
        header: 'Должность',
        field: 'position',
        active: true,
        width: '30%'
      },
      {
        header: "Ср",
        field: "1",
        active: true,
        width:"232px"
      },
      {
        header: "Чт",
        field: "2",
        active: true,
        width:"32px"
      },
      {
        header: "Пт",
        field: "3",
        active: true,
        width:"32px"
      },
      {
        header: "Сб",
        field: "4",
        active: true,
        width:"32px"
      },
      {
        header: "Вс",
        field: "5",
        active: true,
        width:"32px"
      },
      {
        header: "Вс",
        field: "6",
        active: true,
        width:"32px"
      },
      {
        header: "Вт",
        field: "7",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "8",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "9",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "10",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "11",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "12",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "13",
        active: true,
        width:"32px"
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
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "16",
        active: true,
        width:"32px"
      },
      {
        header: "Чт",
        field: "17",
        active: true,
        width:"32px"
      },
      {
        header: "Пт",
        field: "18",
        active: true,
        width:"32px"
      },
      {
        header: "Сб",
        field: "19",
        active: true,
        width:"32px"
      },
      {
        header: "Вс",
        field: "20",
        active: true,
        width:"32px"
      },
      {
        header: "Вс",
        field: "21",
        active: true,
        width:"32px"
      },
      {
        header: "Вт",
        field: "22",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "23",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "24",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "25",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "26",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "27",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "28",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "29",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "30",
        active: true,
        width:"32px"
      },
      {
        header: "Ср",
        field: "31",
        active: true,
        width:"32px"
      },
    ],
    generalTotalCount: 0,
    generalLoading: false
  }),
  actions: {
    
  }
})
