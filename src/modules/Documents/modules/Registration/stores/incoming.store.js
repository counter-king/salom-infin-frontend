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
        field: "reg_number"
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
        field: "author"
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
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      },
      {
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      },
      {
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      },
      {
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      },
      {
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      },
      {
        index: 1,
        reg_number: "156/65",
        author: "Mark Twain"
      },
      {
        index: 2,
        reg_number: "2023/56",
        author: "Mark Twain"
      }
    ]
  }),
  actions: {

  }
})
