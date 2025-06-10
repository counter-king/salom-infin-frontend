import { defineStore } from 'pinia';
const defaultGeneralHeaders = [
  {
    header: 'Сотрудник',
    field: 'employee',
    active: true,
    width: '170px',
    frozen: true
  },
  {
    header: 'Подразделение',
    field: 'division',
    active: true,
    width: '170px',
    frozen: false
  },
  {
    header: 'Должность',
    field: 'position',
    active: true,
    width: '170px',
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
    width:"fit-content"
  },
  {
    header: "",
    field: "2",
    value: {
      top: "Чт",
      bottom: "2"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "3",
    value: {
      top: "Пт",
      bottom: "3"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "4",
    value: {
      top: "Сб",
      bottom: "4"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "5",
    value: {
      top: "Вс",
      bottom: "5"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "6",
    value: {
      top: "Вс",
      bottom: "6"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "7",
    value: {
      top: "Вт",
      bottom: "7"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "8",
    value: {
      top: "Ср",
      bottom: "8"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "9",
    value: {
      top: "Ср",
      bottom: "9"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "10",
    value: {
      top: "Ср",
      bottom: "10"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "11",
    value: {
      top: "Ср",
      bottom: "11"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "12",
    value: {
      top: "Ср",
      bottom: "12"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "13",
    value: {
      top: "Ср",
      bottom: "13"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "14",
    value: {
      top: "Ср",
      bottom: "14"
    },
    active: true,
    width:"fit-content"
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
    width:"fit-content"
  },
  {
    header: "",
    field: "16",
    value: {
      top: "Ср",
      bottom: "16"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "17",
    value: {
      top: "Чт",
      bottom: "17"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "18",
    value: {
      top: "Пт",
      bottom: "18"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "19",
    value: {
      top: "Сб",
      bottom: "19"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "20",
    value: {
      top: "Вс",
      bottom: "20"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "21",
    value: {
      top: "Вс",
      bottom: "21"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "22",
    value: {
      top: "Вт",
      bottom: "22"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "23",
    value: {
      top: "Ср",
      bottom: "23"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "24",
    value: {
      top: "Ср",
      bottom: "24"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "25",
    value: {
      top: "Ср",
      bottom: "25"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "26",
    value: {
      top: "Ср",
      bottom: "26"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "27",
    value: {
      top: "Ср",
      bottom: "27"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "28",
    active: true,
    value: {
      top: "Ср",
      bottom: "28"
    },
    width:"fit-content"
  },
  {
    header: "",
    field: "29",
    value: {
      top: "Ср",
      bottom: "29"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "30",
    value: {
      top: "Ср",
      bottom: "30"
    },
    active: true,
    width:"fit-content"
  },
  {
    header: "",
    field: "31",
    value: {
      top: "Ср",
      bottom: "31"
    },
    active: true,
    width:"fit-content"
  },
]
export const useStateStore = defineStore("state-store", {
  state: () => ({
    generalList: [
     ...Array.from({ length: 5 }, (_, i) => ({
        employee: 'Abdullayev Mo’min Botir o’g’li',
        division: 'Ichki dasturiy taminotlarni ishlab chiqish bo’limi',
        position: 'Заместитель директора ',
        "1":8,
        "2":8,
        "3":8,
        "4":8,
        "5":8,
        "6":8,
        "7":8,
        "8":8,
        "9":8,
        "10":8,
        "11":8,
        "12":8,
        "13":8,
        "14":8,
        "15":8,
        "16":8,
        "17":8,
        "18":8,
        "19":8,
        "20":8,
        "21":8,
        "22":8,
        "23":8,
        "24":8,
        "25":8,
        "26":"rest",
        "27":8,
        "28":8,
        "29":8,
        "30":8,
        "31":8,
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
