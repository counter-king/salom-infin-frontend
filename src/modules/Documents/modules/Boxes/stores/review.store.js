// Core
import { defineStore } from "pinia"
// Store
import { useBoxesCommonStore } from "./common.store"
import { useDocFlowStore } from '@/modules/Documents/modules/Registration/stores/docflow.store'
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
// Service
import {
  fetchReviewList,
  fetchReviewById,
  fetchChangeReviewer,
  fetchSignOrCancel,
  fetchAcquaintDocument,
  fetchPerformDocument
} from "../services/review.service.js"
// Utils
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
export const useReviewStore = defineStore("review", {
  state: () => ({
    list: [],
    headers: [
      {
        header: "priority",
        field: "document.priority",
        detail: {
          component: 'priority-chip',
          colClass: null,
          order: 11
        },
        active: true
      },
      {
        header: "naming",
        field: "document.title",
        detail: {
          component: null,
          colClass: null,
          order: 12
        },
        active: true
      },
      {
        header: "document-type",
        field: "document.document_type.name",
        detail: {
          component: null,
          colClass: null,
          order: 13
        },
        active: true
      },
      {
        header: "deliver-type",
        field: "document.delivery_type.name",
        detail: {
          component: null,
          colClass: null,
          order: 14
        },
        active: false
      },
      {
        header: "description",
        field: "document.description",
        detail: {
          component: null,
          colClass: null,
          order: 15
        },
        active: false,
      },
      {
        header: "magazine",
        field: "document.journal.name",
        detail: {
          component: null,
          colClass: null,
          order: 16
        },
        active: false
      },
      {
        header: "language-document",
        field: "document.language.name",
        detail: {
          component: null,
          colClass: null,
          order: 17
        },
        active: false
      },
      {
        header: "number-sheets",
        field: "document.number_of_papers",
        detail: {
          component: null,
          colClass: null,
          order: 18
        },
        active: false
      },
      {
        header: "outgoing-date",
        field: "document.outgoing_date",
        detail: {
          component: null,
          colClass: null,
          order: 19
        },
        active: false
      },
      {
        header: "outgoing-number",
        field: "document.outgoing_number",
        detail: {
          component: null,
          colClass: null,
          order: 20
        },
        active: false
      },
      {
        header: "reg-number",
        field: "document.register_number",
        detail: {
          component: null,
          colClass: null,
          order: 3
        },
        active: true
      },
      {
        header: "reg-date",
        field: "document.register_date",
        detail: {
          component: null,
          colClass: null,
          order: 2
        },
        active: true
      },
      {
        header: "reviewers",
        field: "for_reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: null,
          order: 21
        },
        active: true
      },
      {
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
          colClass: null,
          order: 4
        },
        active: true
      },
      {
        header: "correspondent",
        field: "document.correspondent.name",
        detail: {
          component: null,
          colClass: 'w-full',
          order: 1
        },
        active: true
      },
      {
        header: "code",
        field: "document.code",
        detail: {
          component: null,
          colClass: null,
          order: 22
        },
        active: false
      },
      {
        header: "grif",
        field: "document.grif",
        detail: {
          component: null,
          colClass: null,
          order: 23
        },
        active: false,
      },
    ],
    detailModel: {
      id: null,
      document: {
        id: null,
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
        __files: [],
      },
      has_resolution: false,
      read_time: null,
      user: null,
    },
    listLoading: false,
    performModel: {
      comment: null,
      files: []
    },
    totalCount: 0
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
    async actionReviewList(params = {}) {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchReviewList(params)

      this.list = data.results
      this.listLoading = false
      this.totalCount = data.count
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionReviewList',
        fn: this.actionReviewList,
        params
      })
    },
    /**
    * Получить на рассмотрение по id
    * */
    async actionReviewById(payload) {
      const collectStore = useCollectRequestsStore()
      const commonStore = useBoxesCommonStore()
      let { data } = await fetchReviewById({ id: payload.id })

      this.detailModel = data
      this.detailModel.document.__files = data.document.files.map(file => file.file)

      this.actionSetPerform({
        comment: data.comment,
        files: data.files
      })

      // Есть ли созданная резолюция
      if(data.assignments && data.assignments.length) {
        let resolution = data.assignments[0]

        await commonStore.actionSetActiveResolution({
          signed: resolution.is_verified,
          receipt_date: resolution.receipt_date,
          deadline: resolution.deadline,
          content: resolution.content,
          assignees: resolution.assignees,
          reviewer: data.user
        })
      }
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionReviewById',
        fn: this.actionReviewById,
        params: payload
      })
    },
    /*
    * Перенаправить документ
    * */
    async actionChangeReviewer({ id, body }) {
      try {
        await fetchChangeReviewer({ id, body })
        dispatchNotify(null, 'Документ перенаправлен к пользователю', COLOR_TYPES.SUCCESS)
        return Promise.resolve()
      } catch (error) {
        // dispatchNotify('Ошибка', 'Ошибка перенаправить документ', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Подписать или удалить подпись
    * */
    async actionSignOrCancel(body) {
      const docflowStore = useDocFlowStore()
      const commonStore = useBoxesCommonStore()
      const resolutionIds = commonStore.createdResolutionsList.items.map(({ resolution }) => resolution.id)
      let model = Object.assign(body, { assignment_ids: resolutionIds })

      try {
        await fetchSignOrCancel(model)
        await this.actionReviewById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        // Если идет подпись
        if(body.is_verified) {
          dispatchNotify(null, 'Резолюция подписан', COLOR_TYPES.SUCCESS)
        } else {
          dispatchNotify(null, 'Подпись удален из резолюции', COLOR_TYPES.SUCCESS)
        }
        return Promise.resolve()
      } catch (error) {
        // Если идет подпись
        // if(body.is_verified) {
        //   dispatchNotify('Ошибка', 'Ошибка подписание резолюции', COLOR_TYPES.ERROR)
        // } else {
        //   dispatchNotify('Ошибка', 'Ошибка удаление подписа', COLOR_TYPES.ERROR)
        // }
        return Promise.reject()
      }
    },
    /*
    * Ознакомиться с документом
    * */
    async actionAcquaintDocument({ id }) {
      try {
        const docflowStore = useDocFlowStore()
        await fetchAcquaintDocument({ id })
        await this.actionReviewById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        dispatchNotify(null, 'Документ ознакомлен', COLOR_TYPES.SUCCESS)
      } catch (error) {
        // dispatchNotify('Ошибка', 'Ошибка ознакомление документа', COLOR_TYPES.ERROR)
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
            files: this.performModel.files.map(file => ({ id: file.id }))
          }
        })
        await this.actionReviewById(this.detailModel)
        await docflowStore.actionGetTree(this.detailModel.document.id)
        // Если идет выполнения документа
        if(performed) {
          dispatchNotify(null, 'Документ выполнен', COLOR_TYPES.SUCCESS)
        }
        else {
          dispatchNotify(null, 'Исполнения изменено', COLOR_TYPES.SUCCESS)
        }
        return Promise.resolve()
      }
      catch (error) {
        // Если идет выполнения документа
        // if(performed) {
        //   dispatchNotify('Ошибка', 'Ошибка выполнение документа', COLOR_TYPES.ERROR)
        // }
        // else {
        //   dispatchNotify('Ошибка', 'Ошибка исполнение документа', COLOR_TYPES.ERROR)
        // }
        return Promise.reject()
      }
    },
    /*
    *
    * */
    actionSetPerform({ comment, files }) {
      Object.assign(this.performModel, { comment, files })
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
          field: "for_reviewers",
          detail: {
            component: 'base-avatar-group',
            colClass: null
          },
          active: true
        },
        {
          header: "status",
          field: "status",
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
      ]
    }
  }
})
