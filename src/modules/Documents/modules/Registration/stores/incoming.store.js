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
        },
        active: true
      },
      {
        header: "naming",
        field: "title",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "document-type",
        field: "document_type",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "deliver-type",
        field: "delivery_type",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "description",
        field: "description",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "magazine",
        field: "journal",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "language-document",
        field: "language",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "number-sheets",
        field: "number_of_papers",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "outgoing-date",
        field: "outgoing_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "outgoing-number",
        field: "outgoing_number",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "reg-number",
        field: "register_number",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "reg-date",
        field: "register_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "reviewers",
        field: "reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: '',
        },
        active: true
      },
      {
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
          colClass: '',
        },
        active: true
      },
      {
        header: "correspondent",
        field: "correspondent",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "",
        field: "action",
        active: true
      }
    ],
    list: [],
    listLoading: false,
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
      this.listLoading = true;
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.INCOMING })

      this.list = data.results
      this.listLoading = false;
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
