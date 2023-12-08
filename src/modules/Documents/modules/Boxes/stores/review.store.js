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
import { setValuesToKeys, combineKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'

export const useReviewStore = defineStore("review", {
  state: () => ({
    list: [],
    headers: [
      {
        header: "priority",
        field: "document.priority.id",
        detail: {
          component: 'priority-chip',
          colClass: null
        },
        active: true
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
        active: false,
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
        header: "reviewers",
        field: "document.reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: null
        },
        active: true
      },
      {
        header: "status",
        field: "document.status.id",
        detail: {
          component: 'base-status',
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
      },
    ],
    detailModel: {
      assignments: [],
      id: null,
      document: {
        id: null,
        title: null
      },
      has_resolution: false,
      is_read: false,
      __copy_prototype: null
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

      this.detailModel.__copy_prototype = combineKeys(this.headers, data)
      setValuesToKeys(this.detailModel, data)
      // this.detailModel.__reviewers = data.reviewers.map(item => {
      //   return {
      //     ...item,
      //     __userId: item.user.id
      //   }
      // })
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
