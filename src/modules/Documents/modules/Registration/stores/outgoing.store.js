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
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
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
        header: "Действие",
        field: "action",
        active: true
      }
    ],
    listLoading: false,
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
      __copy_prototype: null
    },
    createFormModel: {
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
      grif: 3
    }
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionGetList() {
      this.listLoading = true;
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.OUTGOING })

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
              document: this.detailModel.id
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
