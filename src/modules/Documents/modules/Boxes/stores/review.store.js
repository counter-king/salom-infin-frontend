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
} from "@/api/Incoming/review.service"
// Utils
export const useReviewStore = defineStore("review", {
  state: () => ({
    reviewList: [],
    reviewColumns: [
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
          span: "960:2 1240:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
        key: "document.status.id",
        active: false,
        detail: {
          show: true,
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
          span: "960:2 1441:1",
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
      },
      {
        id: 18,
        title: "На рассмотрение",
        key: "reviewers",
        active: false,
        detail: {
          show: true,
          span: "960:2 1441:1",
          component: "avatar-group",
          order: 13
        }
      }
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
    }
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
      let { data } = await fetchReviewList()
      this.reviewList = data.results
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
