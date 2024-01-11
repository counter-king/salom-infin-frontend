// Core
import { defineStore } from 'pinia'
// Stores
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
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
        },
        active: true
      },
      {
        header: "document_type",
        field: "document_type",
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
      outgoing_date: null,
      correspondent: null,
      author: null,
      description: null,
      document_type: null,
      reviewers: [],
      __reviewers: [],
      journal: JOURNAL.APPLICATION,
      __copy_prototype: null
    },
    createFormModel: {
      outgoing_date: null,
      correspondent: null,
      author: null,
      description: null,
      document_type: null,
      reviewers: [],
      __reviewers: [],
      journal: JOURNAL.APPLICATION
    }
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionStatementGetList() {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.APPLICATION })

      this.list = data.results
      this.listLoading = false
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionStatementGetList',
        fn: this.actionStatementGetList,
        params: null
      })
    },
    /*
    * Получить документ по id
    * */
    async actionStatementGetById({ id }) {
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
        id: 'actionStatementGetById',
        fn: this.actionStatementGetById,
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
        await this.actionStatementGetById({ id: this.detailModel.id })
        dispatchNotify('Документ создан', 'Документ изменен', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
