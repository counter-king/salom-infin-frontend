// Core
import { defineStore } from 'pinia'
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
  }),
  actions: {
    /*
    * Получить список
    * */
      async actionGetList() {
        this.listLoading = true;
        let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.INNER })

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
          document: 32
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
