// Core
import { defineStore } from "pinia"
// Store
import { useInnerStore } from "./common.store"
import { useDocflowRegistrationStore } from "../../Registration/stores/common.store"
// Service
import { fetchAssignmentList, fetchAssignmentById, fetchAcquaintDocument, fetchPerformDocument } from "../services/assignment.service"
export const useAssignmentStore = defineStore("assignment", {
  state: () => ({
    list: [],
    columns: [
      {
        id: 1,
        type: "selection",
        active: true
      },
      {
        id: 2,
        title: "Корреспондент",
        key: "document.correspondent.name",
        active: true,
        detail: {
          show: true,
          span: "3",
          component: null,
          order: 14
        }
      },
      {
        id: 3,
        title: "Рег. номер",
        key: "document.register_number",
        active: true,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 5
        }
      },
      {
        id: 4,
        title: "Тип документа",
        key: "document.document_type.name",
        active: true,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 2
        }
      },
      {
        id: 6,
        title: "Код",
        key: "document.code",
        active: false
      },
      {
        id: 7,
        title: "Вид подачи",
        key: "document.delivery_type.name",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 7
        }
      },
      {
        id: 8,
        title: "Исх. номер",
        key: "document.outgoing_number",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 8
        }
      },
      {
        id: 9,
        title: "Приоритет",
        key: "document.priority.id",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: "priority",
          order: 3
        }
      },
      {
        id: 10,
        title: "Рег. дата",
        key: "document.register_date",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 6
        }
      },
      {
        id: 11,
        title: "Наименование",
        key: "document.title",
        active: false,
        detail: {
          show: true,
          span: "3",
          component: null,
          order: 1
        }
      },
      {
        id: 12,
        title: "Статус",
        key: "document.status",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: "status",
          order: 4
        }
      },
      {
        id: 13,
        title: "Исх. дата",
        key: "document.outgoing_date",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 9
        }
      },
      {
        id: 14,
        title: "Язык",
        key: "document.language.name",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 10
        }
      },
      {
        id: 15,
        title: "Гриф",
        key: "document.grif",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 11
        }
      },
      {
        id: 16,
        title: "Гриф",
        key: "document.code",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 12
        }
      },
      {
        id: 17,
        title: "Описание",
        key: "document.description",
        active: false,
        ellipsis: true,
        detail: {
          show: true,
          span: "3",
          component: null,
          order: 15
        }
      }
    ],
    detailModel: {
      id: null,
      assignment: {
        id: null,
        reviewer: {
          id: null
        }
      },
      document: {
        id: null,
        title: null
      },
      is_read: false
    },
    performModel: {
      content: null,
      files: []
    }
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
      let { data } = await fetchAssignmentList()
      this.list = data.results
    },
    /**
     * Получить поручение по id
     * */
    async actionAssignmentById(payload) {
      let { data } = await fetchAssignmentById({ id: payload.id })
      this.detailModel = data
      this.performModel.content = data.content
    },
    /**
     * Создать резолюцию (поручение)
     * */
    async actionCreateAssignmentResolution({ reviewId, parentId, resolutionCreateType }) {
      const innerStore = useInnerStore()
      await innerStore.actionCreateResolution({ reviewId, parentId, resolutionCreateType })
      await innerStore.actionResolutionsList({ id: this.detailModel.document.id })
    },
    /*
    * Изменить созданную резолюцию по id
    * */
    async actionUpdateAssignmentResolutionById(payload) {
      const innerStore = useInnerStore()
      await innerStore.actionUpdateByIdResolution(payload)
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      const docflowStore = useDocflowRegistrationStore()
      await fetchAcquaintDocument({ id })
      await this.actionAssignmentById(this.detailModel)
      await docflowStore.actionGetTree(this.detailModel.document.id)
    },
    /*
    * Выполнить документ
    * */
    async actionPerformDocument({ id }) {
      const docflowStore = useDocflowRegistrationStore()
      await fetchPerformDocument({ id, model: this.performModel })
      await this.actionAssignmentById(this.detailModel)
      await docflowStore.actionGetTree(this.detailModel.document.id)
    }
  }
})
