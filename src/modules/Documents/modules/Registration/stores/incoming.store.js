import { defineStore } from "pinia"
// Utils
export const useRegIncoming = defineStore("reg-incoming", {
  state: () => ({
    headers: [
      {
        header: "№",
        field: "index"
      },
      {
        header: "priority",
        field: "index"
      },
      {
        header: "reg-number",
        field: "index"
      },
      {
        header: "Вид документа",
        field: "index"
      },
      {
        header: "Дата поступления",
        field: "index"
      },
      {
        header: "author",
        field: "index"
      },
      {
        header: "Статус",
        field: "index"
      },
      {
        header: "correspondent",
        field: "index"
      },
    ],
    list: [
      {
        index: 1
      },
      {
        index: 2
      }
    ]
  }),
  actions: {

  }
})
