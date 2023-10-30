// Core
import { defineStore } from "pinia"
// Store
import { useDocflowRegistrationStore } from "./common.store"
// Api
import { fetchRegistrationIncomingList } from "../services/incoming"
// Utils
import { withAsync } from "@/utils/withAsync"
import { JOURNAL } from "@/enums"

export const useRegistrationIncomingStore = defineStore("registrationIncomingStore", {
  state: () => ({
    incomingDocumentList: null,
    registrationIncomingCols: [
      {
        id: 1,
        type: "selection",
        active: true
      },
      {
        id: 2,
        title: "Корреспондент",
        key: "correspondent.name",
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
        key: "register_number",
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
        key: "document_type.name",
        active: true,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 2
        }
      },
      {
        id: 5,
        title: "Содержание",
        key: "description",
        active: true,
        ellipsis: true
      },
      {
        id: 8,
        title: "Код",
        key: "code",
        active: false
      },
      {
        id: 9,
        title: "Вид подачи",
        key: "delivery_type.name",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 7
        }
      },
      {
        id: 10,
        title: "Исх. номер",
        key: "outgoing_number",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 8
        }
      },
      {
        id: 11,
        title: "Приоритет",
        key: "priority.id",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: "priority",
          order: 3
        }
      },
      {
        id: 12,
        title: "Рег. дата",
        key: "register_date",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 6
        }
      },
      {
        id: 13,
        title: "Наименование",
        key: "title",
        active: false,
        detail: {
          show: true,
          span: "3",
          component: null,
          order: 1
        }
      },
      {
        id: 14,
        title: "Статус",
        key: "status",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: "status",
          order: 4
        }
      },
      {
        id: 15,
        title: "Исх. дата",
        key: "outgoing_date",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 9
        }
      },
      {
        id: 16,
        title: "Язык",
        key: "language.name",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 10
        }
      },
      {
        id: 17,
        title: "Гриф",
        key: "grif",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 11
        }
      },
      {
        id: 18,
        title: "Гриф",
        key: "code",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: null,
          order: 12
        }
      },
      {
        id: 18,
        title: "Описание",
        key: "description",
        active: false,
        detail: {
          show: true,
          span: "3",
          component: null,
          order: 15
        }
      },
      {
        id: 19,
        title: "На рассмотрение",
        key: "reviewers",
        active: false,
        detail: {
          show: true,
          span: "1",
          component: "avatar-group",
          order: 13
        }
      },
    ],
    incomingDetailModel: {
      document_type: null,
      title: null,
      delivery_type: null,
      // TODO: Временно 1 для создания документа (Входящий)
      grif: 1,
      priority: null,
      language: null,
      code: null,
      register_number: null,
      outgoing_number: null,
      register_date: null,
      outgoing_date: null,
      correspondent: null,
      reviewers: [],
      __reviewers: [],
      __reviewers_copy: [],
      description: null,
      files: null,
      journal: JOURNAL.INCOMING,
    }
  }),
  getters: {
    getIncomingDocumentList: state => state.incomingDocumentList,
    getRegistrationIncomingCols: (state) => state.registrationIncomingCols
  },
  actions: {
    async actionRegistrationIncomingList(params) {
      const { response, error } = await withAsync(fetchRegistrationIncomingList, params)
      if (response.data.results.length){
        this.incomingDocumentList = response.data.results
      }
      return Promise.resolve(response.data)
    },
    /**
     * Получить входящий документ по id
     * */
    async actionIncomingById(payload) {
      const docFlow = useDocflowRegistrationStore()
      this.incomingDetailModel = await docFlow.actionGetDocumentById({ id: payload.id })
    },
    /*
    *
    * */
    async actionTransformModelKeys(payload) {
      this.incomingDetailModel.document_type = this.incomingDetailModel.document_type.id
      this.incomingDetailModel.delivery_type = this.incomingDetailModel.delivery_type.id
      this.incomingDetailModel.priority = this.incomingDetailModel.priority.id
      this.incomingDetailModel.language = this.incomingDetailModel.language.id
      this.incomingDetailModel.journal = this.incomingDetailModel.journal.id
      this.incomingDetailModel.correspondent = this.incomingDetailModel.correspondent.id
      this.incomingDetailModel.__reviewers = this.incomingDetailModel.reviewers.map(item => item.user.id)
      this.incomingDetailModel.reviewers
        = this.incomingDetailModel.__reviewers_copy
        = this.incomingDetailModel.reviewers.map(item => {
        return {
          id: item.id,
          user: item.user.id,
          document: Number(payload.id)
        }
      })
    }
  }
})
