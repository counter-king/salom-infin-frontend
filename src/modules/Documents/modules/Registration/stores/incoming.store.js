// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetDocumentList, fetchGetDocumentById } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegIncoming = defineStore("reg-incoming", {
  state: () => ({
    headers: [
      {
        header: "priority",
        field: "priority",
        detail: {
          component: 'base-priority',
          colClass: '',
        }
      },
      {
        header: "naming",
        field: "title",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "document-type",
        field: "document_type",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
          colClass: '',
        }
      },
      {
        header: "correspondent",
        field: "correspondent",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "deliver-type",
        field: "delivery_type",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "description",
        field: "description",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "magazine",
        field: "journal",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "language-document",
        field: "language",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "number-sheets",
        field: "number_of_papers",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "outgoing-date",
        field: "outgoing_date",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "outgoing-number",
        field: "outgoing_number",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "reg-number",
        field: "register_number",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "reg-date",
        field: "register_date",
        detail: {
          component: null,
          colClass: '',
        }
      },
      {
        header: "reviewers",
        field: "reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: '',
        }
      },
    ],
    list: [],
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
    * Получить список
    * */
    async actionGetList() {
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.INCOMING })

      this.list = data.results
    },
    /*
    * Получить документ по id
    * */
    async actionGetById({ id }) {
      let { data } = await fetchGetDocumentById(id)

      this.detailModel = data
    }
  }
})
