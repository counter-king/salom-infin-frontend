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
        header: "reg-date",
        field: "outgoing_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "description",
        field: "description",
        detail: {
          component: null,
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
        header: "reviewers",
        field: "reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: '',
        },
        active: true
      },
      {
        header: "Действие",
        field: "action",
        active: true
      }
    ],
    list: [],
    listLoading: false,
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
      this.listLoading = true;
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.ORDERS_PROTOCOLS })

      this.list = data.results
      this.listLoading = false
    },
    /*
    * Получить документ по id
    * */
    async actionGetById({ id }) {
      let { data } = await fetchGetDocumentById(id)

      this.detailModel.__copy_prototype = combineKeys(this.headers, data)
      setValuesToKeys(this.detailModel, data)
      this.detailModel.__reviewers = data.reviewers.map(item => {
        return {
          ...item,
          __userId: item.user.id
        }
      })
    },
    /*
    * Изменить документ
    * */
    async actionUpdateDocument() {
      let model = {
        ...this.detailModel,
        reviewers: this.detailModel.__reviewers.map(item => {
          if(item.__userId) {
            return {
              id: item.id,
              user: item.__userId,
              document: item.document
            }
          }
          else {
            return {
              user: item.id,
            }
          }
        })
      }

      try {
        await fetchUpdateDocument({ id: this.detailModel.id, body: model })
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
