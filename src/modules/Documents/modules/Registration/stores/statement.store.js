// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetDocumentList, fetchGetDocumentById, fetchUpdateDocument } from '../services/docflow.service'
// Utils
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'
// Utils
export const useRegStatement = defineStore("reg-statement", {
  state: () => ({
    headers: [
      {
        header: "outgoing-date",
        field: "outgoing_date",
        detail: {
          component: null,
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
        header: "document_type",
        field: "document_type",
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
      outgoing_date: null,
      correspondent: null,
      author: null,
      description: null,
      document_type: null,
      reviewers: [],
      __reviewers: [],
      journal: JOURNAL.APPLICATION,
    },
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionGetList() {
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.APPLICATION })

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
          document: 39
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
