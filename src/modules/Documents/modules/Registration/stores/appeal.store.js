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
export const useRegAppeal = defineStore("reg-appeal", {
  state: () => ({
    headers: [
      {
        header: "outgoing-number",
        field: "outgoing_number",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "outgoing-date",
        field: "outgoing_date",
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
        header: "document-type",
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
      outgoing_number: null,
      outgoing_date: null,
      correspondent: null,
      applicant: null,
      region:null,
      area:null,
      full_name_applicant: null,
      address: null,
      phone_number: null,
      submission_form: null,
      type_complaint:null,
      reviewers: [],
      __reviewers: [],
      duplicateSwitch: false,
      repeated_application: true,
      description: null,
      status: null,
      journal: JOURNAL.APPEALS,
      grif: 4,
      __copy_prototype: null
    },
    createFormModel: {
      outgoing_number: null,
      outgoing_date: null,
      correspondent: null,
      applicant: null,
      region:null,
      area:null,
      full_name_applicant: null,
      address: null,
      phone_number: null,
      submission_form: null,
      type_complaint:null,
      reviewers: [],
      __reviewers: [],
      duplicateSwitch: false,
      repeated_application: true,
      description: null,
      status: null,
      journal: JOURNAL.APPEALS,
      grif: 4
    }
  }),
  actions: {
    /*
    * Получить список
    * */
    async actionAppealGetList() {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchGetDocumentList({ journal_id: JOURNAL.APPEALS })

      this.list = data.results
      this.listLoading = false
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionAppealGetList',
        fn: this.actionAppealGetList,
        params: null
      })
    },
    /*
    * Получить документ по id
    * */
    async actionAppealGetById({ id }) {
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
        id: 'actionAppealGetById',
        fn: this.actionAppealGetById,
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
        await fetchUpdateDocument({ id: this.detailModel.id, body: this.detailModel })
        await this.actionAppealGetById({ id: this.detailModel.id })
        dispatchNotify('Документ создан', 'Документ изменен', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
