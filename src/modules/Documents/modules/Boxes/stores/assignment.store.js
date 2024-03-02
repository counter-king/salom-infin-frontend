// Core
import { defineStore } from "pinia"
// Store
import { useBoxesCommonStore } from './common.store'
import { useDocFlowStore } from '../../Registration/stores/docflow.store'
// Service
import { fetchAssignmentList, fetchAssignmentById, fetchAcquaintDocument, fetchPerformDocument } from "../services/assignment.service"
import { fetchPerformList } from '../services/review.service'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'
import { useCollectRequestsStore } from "@/stores/collect-requests.store";

export const useAssignmentStore = defineStore("assignment", {
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
      status: null,
    },
    performModel: {
      content: null,
      files: [],
      is_performed: false
    },
    listLoading: false,
    totalCount: 0
  }),
  getters: {
    /*
    * Ознакомлен ли документ
    * */
    isDocumentAcquainted: state => state.detailModel.is_read
  },
  actions: {
    /*
    * Список поручение
    * */
    async actionAssignmentList(params = {}) {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchAssignmentList(params)

      this.list = data.results
      this.listLoading = false
      this.totalCount = data.count
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionAssignmentList',
        fn: this.actionAssignmentList,
        params
      })
    },
    /**
     * Получить поручение по id
     * */
    async actionAssignmentById(payload) {
      const collectStore = useCollectRequestsStore()
      const commonStore = useBoxesCommonStore()
      let { data } = await fetchAssignmentById({ id: payload.id })
      let { data: performers } = await fetchPerformList({ id: data.assignment.id })

      this.detailModel = data
      this.detailModel.document.__files = data.document.files.map(file => file.file)

      this.actionSetPerform({
        content: data.content,
        is_performed: data.is_performed,
        files: data.files,
      })

      await commonStore.actionSetActiveResolution({
        signed: data.assignment?.is_verified,
        receipt_date: data.assignment?.receipt_date,
        deadline: data.assignment?.deadline,
        content: data.assignment?.content,
        assignees: performers.performers,
        reviewer: data.assignment?.reviewer.user
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionAssignmentById',
        fn: this.actionAssignmentById,
        params: payload
      })
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      try {
        const docflowStore = useDocFlowStore()
        await fetchAcquaintDocument({ id })
        await this.actionAssignmentById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        dispatchNotify('Документ ознакомлен', null, COLOR_TYPES.SUCCESS)
      } catch (error) {
        dispatchNotify('Ошибка', 'Ошибка ознакомление документа', COLOR_TYPES.ERROR)
      }
    },
    /*
    * Выполнить документ
    * */
    async actionPerformDocument({ id, performed }) {
      try {
        const docflowStore = useDocFlowStore()
        await fetchPerformDocument({
          id,
          model: {
            ...this.performModel,
            is_performed: performed,
            files: this.performModel.files.map(file => ({ id: file.id }))
          }
        })
        await this.actionAssignmentById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        // Если идет выполнения документа
        if(this.performModel.is_performed) {
          dispatchNotify('Документ выполнен', null, COLOR_TYPES.SUCCESS)
        }
        else {
          dispatchNotify('Исполнения изменено', null, COLOR_TYPES.SUCCESS)
        }
        return Promise.resolve()
      }
      catch (error) {
        // Если идет выполнения документа
        if(this.performModel.is_performed) {
          dispatchNotify('Ошибка', 'Ошибка выполнение документа', COLOR_TYPES.ERROR)
        }
        else {
          dispatchNotify('Ошибка', 'Ошибка исполнение документа', COLOR_TYPES.ERROR)
        }
        return Promise.reject()
      }
    },
    /*
    *
    * */
    actionSetPerform({ content, files, is_performed }) {
      Object.assign(this.performModel, { content, files, is_performed })
    },
    /*
    * Сбросит все колонки в изначальное состояние
    * */
    resetHeaders() {
      this.headers = [
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
      ]
    }
  }
})
