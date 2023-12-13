// Core
import { defineStore } from "pinia"
// Store
import { useDocFlowStore } from "../../Registration/stores/docflow.store"
// Service
import { fetchAssignmentList, fetchAssignmentById, fetchAcquaintDocument, fetchPerformDocument } from "../services/assignment.service"
// Utils
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'

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
        title: null
      },
      is_controller: null,
      is_performed: null,
      is_read: null,
      is_responsible: null,
      performed_date: null,
      read_time: null,
      status: null,
      perfuserormed_date: null
    },
    performModel: {
      content: null,
      files: []
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
    * Список поручение
    * */
    async actionAssignmentList() {
      this.listLoading = true
      let { data } = await fetchAssignmentList()

      this.list = data.results
      this.listLoading = false
    },
    /**
     * Получить поручение по id
     * */
    async actionAssignmentById(payload) {
      let { data } = await fetchAssignmentById({ id: payload.id })
      this.detailModel = data
      this.performModel.content = data.content
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      const docflowStore = useDocFlowStore()
      await fetchAcquaintDocument({ id })
      await this.actionAssignmentById(this.detailModel)
      await docflowStore.actionGetTree(this.detailModel.document.id)
    },
    /*
    * Выполнить документ
    * */
    async actionPerformDocument({ id }) {
      const docflowStore = useDocFlowStore()
      await fetchPerformDocument({ id, model: this.performModel })
      await this.actionAssignmentById(this.detailModel)
      await docflowStore.actionGetTree(this.detailModel.document.id)
    }
  }
})
