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
export const useRegInner = defineStore("reg-inner", {
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
        field: "register_date",
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
      register_number: null,
      register_date: null,
      document_type: null,
      deadline: null,
      __department: [],
      __signers: [],
      reviewers: [],
      __reviewers: [],
      author: null,
      description: null,
      journal: JOURNAL.INNER,
      grif: 2,
      __copy_prototype: null
    },
    createFormModel: {
      register_number: null,
      register_date: null,
      document_type: null,
      deadline: null,
      __department: [],
      __signers: [],
      reviewers: [],
      __reviewers: [],
      author: null,
      description: null,
      journal: JOURNAL.INNER,
      grif: 2
    }
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionInnerGetList() {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true;
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.INNER })

      this.list = data.results
      this.listLoading = false
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionInnerGetList',
        fn: this.actionInnerGetList,
        params: null
      })
    },
    /*
    * Получить документ по id
    * */
    async actionInnerGetById({ id }) {
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
        id: 'actionInnerGetById',
        fn: this.actionInnerGetById,
        params: { id }
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
        await this.actionInnerGetById({ id: this.detailModel.id })
        dispatchNotify('Документ создан', 'Документ изменен', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
