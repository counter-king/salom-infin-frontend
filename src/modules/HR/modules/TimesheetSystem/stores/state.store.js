import { defineStore } from 'pinia';
const defaultGeneralHeaders = [
  {
    header: 'Сотрудник',
    field: 'employee',
    active: true,
    width: '200px',
    frozen: true
  },
  {
    header: 'Подразделение',
    field: 'division',
    active: true,
    width: '210px',
    frozen: false
  },
  {
    header: 'Должность',
    field: 'position',
    active: true,
    width: '200px',
    frozen: false
  },
  {
    header: "",
    field: "1",
    value: {
      top: "Ср",
      bottom: "1"
    },
    active: true,
    width:"232px"
  },
  {
    header: "",
    field: "2",
    value: {
      top: "Чт",
      bottom: "2"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "3",
    value: {
      top: "Пт",
      bottom: "3"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "4",
    value: {
      top: "Сб",
      bottom: "4"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "5",
    value: {
      top: "Вс",
      bottom: "5"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "6",
    value: {
      top: "Вс",
      bottom: "6"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "7",
    value: {
      top: "Вт",
      bottom: "7"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "8",
    value: {
      top: "Ср",
      bottom: "8"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "9",
    value: {
      top: "Ср",
      bottom: "9"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "10",
    value: {
      top: "Ср",
      bottom: "10"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "11",
    value: {
      top: "Ср",
      bottom: "11"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "12",
    value: {
      top: "Ср",
      bottom: "12"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "13",
    value: {
      top: "Ср",
      bottom: "13"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "14",
    value: {
      top: "Ср",
      bottom: "14"
    },
    active: true
  },
  // untill 1..31
  {
    header: "",
    field: "15",
    value: {
      top: "Ср",
      bottom: "15"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "16",
    value: {
      top: "Ср",
      bottom: "16"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "17",
    value: {
      top: "Чт",
      bottom: "17"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "18",
    value: {
      top: "Пт",
      bottom: "18"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "19",
    value: {
      top: "Сб",
      bottom: "19"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "20",
    value: {
      top: "Вс",
      bottom: "20"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "21",
    value: {
      top: "Вс",
      bottom: "21"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "22",
    value: {
      top: "Вт",
      bottom: "22"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "23",
    value: {
      top: "Ср",
      bottom: "23"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "24",
    value: {
      top: "Ср",
      bottom: "24"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "25",
    value: {
      top: "Ср",
      bottom: "25"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "26",
    value: {
      top: "Ср",
      bottom: "26"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "27",
    value: {
      top: "Ср",
      bottom: "27"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "28",
    active: true,
    value: {
      top: "Ср",
      bottom: "28"
    },
    width:"32px"
  },
  {
    header: "",
    field: "29",
    value: {
      top: "Ср",
      bottom: "29"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "30",
    value: {
      top: "Ср",
      bottom: "30"
    },
    active: true,
    width:"32px"
  },
  {
    header: "",
    field: "31",
    value: {
      top: "Ср",
      bottom: "31"
    },
    active: true,
    width:"32px"
  },
]
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

    generalHeaders: [...defaultGeneralHeaders],
    generalTotalCount: 0,
    generalLoading: false
  }),
  actions: {
    async actionGeneralList(params){
      this.generalLoading = true
      await setTimeout(() => {
        this.generalLoading = false
      }, 1000);
    },
    resetGeneralHeaders(){
      this.generalHeaders = [...defaultGeneralHeaders]
    }
  },

})
