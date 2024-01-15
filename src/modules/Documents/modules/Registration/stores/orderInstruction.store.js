import { defineStore } from 'pinia'
// Stores
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
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
      __copy_prototype: null
    },
    createFormModel: {
      name_document: null,
      register_number: null,
      outgoing_date: null,
      magazine: null,
      __department: [],
      document_type: null,
      reviewers: [],
      __reviewers: [],
      description: null,
      journal: JOURNAL.ORDERS_PROTOCOLS
    }
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionOrderGetList() {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.ORDERS_PROTOCOLS })

      this.list = data.results
      this.listLoading = false
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionOrderGetList',
        fn: this.actionOrderGetList,
        params: null
      })
    },
    /*
    * Получить документ по id
    * */
    async actionOrderGetById({ id }) {
      const collectStore = useCollectRequestsStore()
      let { data } = await fetchGetDocumentById(id)

      this.detailModel.__copy_prototype = combineKeys(this.headers, data)
      setValuesToKeys(this.detailModel, data)
      this.detailModel.__reviewers = data.reviewers.map(item => {
        return {
          ...item,
          __userId: item.user.id
        }
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionOrderGetById',
        fn: this.actionOrderGetById,
        params: null
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
              document: this.detailModel.id
            }
          }
        })
      }

      try {
        await fetchUpdateDocument({ id: this.detailModel.id, body: model })
        await this.actionOrderGetById({ id: this.detailModel.id })
        dispatchNotify('Документ создан', 'Документ изменен', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
