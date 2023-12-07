// Core
import { defineStore } from "pinia"
// Store
import { useInnerStore } from "./common.store"
// Service
import {
  fetchReviewList,
  fetchReviewById,
  fetchChangeReviewer,
  fetchSignOrCancel,
  fetchAcquaintDocument
} from "../services/review.service.js"
// Utils
export const useReviewStore = defineStore("review", {
  state: () => ({
    list: [],
    headers: [
      {
        header: "correspondent",
        field: "document.correspondent.name",
        detail: {
          component: null,
          colClass: ''
        },
        active: true,
      },
      // {
      //   header: "Рег. номер",
      //   field: "document.register_number",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: true,
      // },
      // {
      //   header: "Тип документа",
      //   field: "document.document_type.name",
      //   active: true,
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   }
      // },
      // {
      //   header: "Код",
      //   field: "document.code",
      //   active: false
      // },
      // {
      //   header: "Вид подачи",
      //   field: "document.delivery_type.name",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Исх. номер",
      //   field: "document.outgoing_number",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Приоритет",
      //   field: "document.priority.id",
      //   detail: {
      //     component: 'priority-chip',
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Рег. дата",
      //   field: "document.register_date",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Наименование",
      //   field: "document.title",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Статус",
      //   field: "document.status.id",
      //   detail: {
      //     component: null,
      //     colClass: 'base-status'
      //   },
      //   active: false,
      // },
      // {
      //   header: "Исх. дата",
      //   field: "document.outgoing_date",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Язык",
      //   field: "document.language.name",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Гриф",
      //   field: "document.grif",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Гриф",
      //   field: "document.code",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "Описание",
      //   field: "document.description",
      //   detail: {
      //     component: null,
      //     colClass: ''
      //   },
      //   active: false,
      // },
      // {
      //   header: "На рассмотрение",
      //   field: "reviewers",
      //   detail: {
      //     component: 'base-avatar-group',
      //     colClass: ''
      //   },
      //   active: false,
      // }
    ],
    detailModel: {
      assignments: [],
      id: null,
      document: {
        id: null,
        title: null
      },
      has_resolution: false,
      is_read: false
    },
    listLoading: false
  }),
  getters: {
    isReviewSigned: state => state.detailModel.assignments.length
      ? state.detailModel.assignments[0].is_verified
      : false,
    /*
    *
    * */
    isResolutionCreated: state => state.detailModel.has_resolution,
    /*
    * Ознакомлен ли документ
    * */
    isDocumentAcquainted: state => state.detailModel.is_read
  },
  actions: {
    /**
    * Получить список на рассмотрение
    * */
    async actionReviewList() {
      this.listLoading = true
      let { data } = await fetchReviewList()

      this.list = data.results
      this.listLoading = false
    },
    /**
    * Получить на рассмотрение по id
    * */
    async actionReviewById(payload) {
      let { data } = await fetchReviewById({ id: payload.id })
      this.detailModel = data
    },
    /**
    * Создать резолюцию (на рассмотрение)
    * */
    async actionCreateReviewResolution({ reviewId, parentId, resolutionCreateType }) {
      const innerStore = useInnerStore()
      await innerStore.actionCreateResolution({ reviewId, parentId, resolutionCreateType })
      await innerStore.actionResolutionsList({ id: this.detailModel.document.id })
    },
    /*
    * Изменить созданную резолюцию по id
    * */
    async actionUpdateReviewResolutionById(payload) {
      const innerStore = useInnerStore()
      await innerStore.actionUpdateByIdResolution(payload)
    },
    /*
    * Перенаправить документ
    * */
    async actionChangeReviewer({ id, body }) {
      await fetchChangeReviewer({ id, body })
    },
    /*
    * Подписать или удалить подпись
    * */
    async actionSignOrCancel(body) {
      const innerStore = useInnerStore()
      const resolutionIds = innerStore.resolutionsList.map(r => r.id)
      let model = Object.assign(body, { assignment_ids: resolutionIds })

      await fetchSignOrCancel(model)
      await this.actionReviewById(this.detailModel)
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      await fetchAcquaintDocument({ id })
      await this.actionReviewById(this.detailModel)
    }
  }
})
