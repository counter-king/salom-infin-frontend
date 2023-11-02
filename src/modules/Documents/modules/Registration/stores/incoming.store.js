// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
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
    ],
    detailModel: {
      code: null,
      correspondent: null,
      delivery_type: null,
      description: null,
      document_type: null,
      files: [],
      // TODO: Временно 1 для создания документа (Входящий)
      grif: 1,
      journal: JOURNAL.INCOMING,
      language: null,
      number_of_papers: null,
      outgoing_date: null,
      outgoing_number: null,
      priority: null,
      register_date: null,
      register_number: null,
      reviewers: [],
      __reviewers: [],
      title: null,
    },
  }),
  actions: {
    /*
    *
    * */
    async actionCreateIncomingDocument(payload) {
      let { data } = await fetchCreateDocument(payload)

      console.log(data);
    }
  }
})
