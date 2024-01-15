// Core
import { defineStore } from "pinia"
// Store
import { useBoxesCommonStore } from './common.store'
import { useDocFlowStore } from '../../Registration/stores/docflow.store'
// Service
import { fetchControlList, fetchControlById, fetchAcquaintDocument, fetchRemoveFromControl } from '../services/control.service'
import { fetchPerformList } from '../services/review.service'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
import { FORM_TYPE_CREATE } from '@/constants/constants'
export const useControlStore = defineStore("control", {
  state: () => ({
    list: [],
    headers: [
      {
        header: "priority",
        field: "document.priority",
        detail: {
          component: "priority-chip",
          colClass: null
        },
        active: false
      },
      {
        header: "naming",
        field: "document.title",
        detail: {
          component: null,
          colClass: null
        },
        active: true
      },
      {
        header: "document-type",
        field: "document.document_type.name",
        detail: {
          component: null,
          colClass: null
        },
        active: true
      },
      {
        header: "deliver-type",
        field: "document.delivery_type.name",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "description",
        field: "document.description",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "magazine",
        field: "document.journal.name",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "language-document",
        field: "document.language.name",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "number-sheets",
        field: "document.number_of_papers",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "outgoing-date",
        field: "document.outgoing_date",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "outgoing-number",
        field: "document.outgoing_number",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "reg-number",
        field: "document.register_number",
        detail: {
          component: null,
          colClass: null
        },
        active: true
      },
      {
        header: "reg-date",
        field: "document.register_date",
        detail: {
          component: null,
          colClass: null
        },
        active: true
      },
      {
        header: "status",
        field: "status",
        detail: {
          component: "base-status",
          colClass: null
        },
        active: true
      },
      {
        header: "correspondent",
        field: "document.correspondent.name",
        detail: {
          component: null,
          colClass: null
        },
        active: true
      },
      {
        header: "code",
        field: "document.code",
        detail: {
          component: null,
          colClass: null
        },
        active: false
      },
      {
        header: "grif",
        field: "document.grif",
        detail: {
          component: null,
          colClass: null
        },
        active: false,
      }
    ],
    detailModel: {
      id: null,
      assignment: [],
      content: null,
      created_date: null,
      document: {
        code: null,
        correspondent: null,
        delivery_type: null,
        description: null,
        document_type: null,
        grif: null,
        journal: null,
        language: null,
        number_of_papers: null,
        outgoing_date: null,
        outgoing_number: null,
        priority: null,
        register_date: null,
        register_number: null,
        title: null,
        __files: []
      },
      is_controller: null,
      is_performed: null,
      is_read: null,
      is_responsible: null,
      performed_date: null,
      read_time: null,
      status: null
    },
    performModel: {
      content: null,
      files: [],
      is_performed: false
    },
    listLoading: false
  }),
  getters: {
    /*
    * Ознакомлен ли документ
    * */
    isDocumentAcquainted: state => state.detailModel.is_read
  },
  actions: {
    /*
    * Список на контроль
    * */
    async actionControlList() {
      this.listLoading = true
      let { data } = await fetchControlList()

      this.list = data.results
      this.listLoading = false
    },
    /**
     * Получить на контроль по id
     * */
    async actionControlById(payload) {
      const commonStore = useBoxesCommonStore()
      let { data } = await fetchControlById({ id: payload.id })
      let { data: performers } = await fetchPerformList({ id: data.assignment.id })

      this.detailModel = data
      this.detailModel.document.__files = data.document.files.map(file => file.file)

      this.actionSetPerform({
        content: data.content,
        is_performed: data.is_performed
      })

      await commonStore.actionSetActiveResolution({
        signed: data.assignment?.is_verified,
        receipt_date: data.assignment?.receipt_date,
        deadline: data.assignment?.deadline,
        content: data.assignment?.content,
        assignees: performers.performers,
        reviewer: data.assignment?.reviewer.user
      })
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      try {
        const docflowStore = useDocFlowStore()
        await fetchAcquaintDocument({ id })
        await this.actionControlById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        dispatchNotify('Документ ознакомлен', null, COLOR_TYPES.SUCCESS)
      } catch (error) {
        dispatchNotify('Ошибка', 'Ошибка ознакомление документа', COLOR_TYPES.ERROR)
      }
    },
    /*
    * Снять с контроля (снять/изменить)
    * */
    async actionRemoveFromControl({ id, type }) {
      try {
        const docflowStore = useDocFlowStore()
        await fetchRemoveFromControl({
          id,
          model: {
            ...this.performModel,
            is_performed: true
          }
        })
        await this.actionControlById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        // Если идет выполнения документа
        if(type === FORM_TYPE_CREATE) {
          dispatchNotify('Документ снят с контроля', null, COLOR_TYPES.SUCCESS)
        }
        else {
          dispatchNotify('Снятия с контроля изменено', null, COLOR_TYPES.SUCCESS)
        }
        return Promise.resolve()
      }
      catch (error) {
        if(type === FORM_TYPE_CREATE) {
          dispatchNotify('Ошибка', 'Ошибка снятия с контроля', COLOR_TYPES.ERROR)
        }
        else {
          dispatchNotify('Ошибка', 'Изменение снятия с контроля', COLOR_TYPES.ERROR)
        }
        return Promise.reject()
      }
    },
    /*
    *
    * */
    actionSetPerform({ content, files, is_performed }) {
      Object.assign(this.performModel, { content, files, is_performed })
    }
  }
})
