import { defineStore } from 'pinia'
// Services
import { fetchGetDocumentList, fetchGetDocumentById, fetchUpdateDocument } from '../services/docflow.service'
// Utils
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { JOURNAL, COLOR_TYPES } from '@/enums'
// Utils
export const useRegOrderInstruction = defineStore("reg-order-instruction", {
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
      // {
      //   header: "name_document",
      //   field: "name_document",
      //   detail: {
      //     component: null,
      //     colClass: '',
      //   }
      // },
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
        field: "outgoing_date",
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
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
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
      name_document: null,
      register_number: null,
      outgoing_date: null,
      magazine: null,
      __department: [],
      document_type: null,
      reviewers: [],
      __reviewers: [],
      description: null,
      journal: JOURNAL.ORDERS_PROTOCOLS,
    },
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionGetList() {
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.ORDERS_PROTOCOLS })

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
          document: 29
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
