// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetDocumentList, fetchGetDocumentById, fetchUpdateDocument } from '../services/docflow.service'
// Utils
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'
// Utils
export const useRegIncoming = defineStore("reg-incoming", {
  state: () => ({
    headers: [
      {
        header: "priority",
        field: "priority",
        detail: {
          component: 'priority-chip',
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
      content_type: 6,
      correspondent: null,
      created_by: null,
      created_date: null,
      delivery_type: null,
      description: null,
      document_type: null,
      files: [],
      // TODO: Временно 1 для создания документа (Входящий)
      grif: 1,
      id: null,
      journal: JOURNAL.INCOMING,
      language: null,
      modified_date: null,
      number_of_papers: null,
      outgoing_date: null,
      outgoing_number: null,
      priority: null,
      register_date: null,
      register_number: null,
      reviewers: [],
      __reviewers: [],
      status: null,
      title: null,
      __copy_prototype: null
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

      this.detailModel.__copy_prototype = combineKeys(this.headers, data)
      setValuesToKeys(this.detailModel, data)
      this.detailModel.__reviewers = this.detailModel.reviewers = data.reviewers.map(item => {
        return {
          full_name: item.user.full_name,
          id: item.id,
          user: item.user.id,
          document: 18
        }
      })
    },
    /*
    * Изменить документ
    * */
    async actionUpdateDocument() {
      try {
        await fetchUpdateDocument({ id: this.detailModel.id, body: this.detailModel })
        await this.actionGetById({ id: this.detailModel.id })
        dispatchNotify('Документ создан', 'Документ изменен', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
