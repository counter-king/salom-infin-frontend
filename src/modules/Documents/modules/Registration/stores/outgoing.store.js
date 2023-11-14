import { defineStore } from 'pinia'
// Services
import { fetchGetDocumentList, fetchGetDocumentById, fetchUpdateDocument } from '../services/docflow.service'
// Utils
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { JOURNAL, COLOR_TYPES } from '@/enums'
// Utils
export const useRegOutgoing = defineStore("reg-outgoing", {
  state: () => ({
    headers: [
      {
        header: "reg-number",
        field: "register_number",
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
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
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
        header: "reg-date",
        field: "register_date",
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
    ],
    list: [],
    detailModel: {
      register_number: null,
      outgoing_date: null,
      document_type: null,
      __department: [],
      __signers: [],
      correspondent: null,
      author: null,
      description: null,
      status: null,
      journal: JOURNAL.OUTGOING,
      grif: 3,
    },
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionGetList() {
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.OUTGOING })

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
          document: 36
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
