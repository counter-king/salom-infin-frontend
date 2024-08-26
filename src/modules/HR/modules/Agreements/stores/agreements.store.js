// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchNegotiationTypes,
  fetchNegotiationSubTypes,
  fetchNegotiationList,
  fetchNegotiationById,
  fetchNegotiationInstances,
  fetchNegotiationCreate,
  fetchNegotiators, fetchSignNegotiators
} from '../services'

let negotiationModel = {
  title: null,
  doc_type: null,
  doc_sub_type: null,
  users: [],
  __users: [],
  content: null
}

export const useAgreementsStore = defineStore('agreements-store', {
  state: () => ({
    headers: [
      {
        header: 'Категория документа',
        field: 'negotiation.doc_type.name',
        active: true
      },
      {
        header: 'Вид документа',
        field: 'negotiation.doc_sub_type.name',
        active: true
      },
      {
        header: 'Дата создание',
        field: 'created_date',
        active: true
      },
      {
        header: '',
        field: 'actions',
        active: true
      }
    ],
    notSignedList: [],
    notSignedCount: 0,
    signedList: [],
    signedHeaders: [
      {
        header: 'Категория документа',
        field: 'negotiation.doc_type.name',
        active: true
      },
      {
        header: 'Вид документа',
        field: 'negotiation.doc_sub_type.name',
        active: true
      },
      {
        header: 'Статус',
        field: 'sign',
        active: true
      },
      {
        header: 'Дата подписание',
        field: 'action_date',
        active: true
      },
      {
        header: '',
        field: 'actions',
        active: true
      }
    ],
    signedCount: 0,
    createdHeaders: [
      {
        header: 'Название документа',
        field: 'title',
        active: true
      },
      {
        header: 'Категория документа',
        field: 'doc_type.name',
        active: true
      },
      {
        header: 'Вид документа',
        field: 'doc_sub_type.name',
        active: true
      },
      {
        header: 'Дата создание',
        field: 'created_date',
        active: true
      }
    ],
    createdList: [],
    createdCount: 0,
    negotiationTypes: [],
    negotiationSubTypes: [],
    formLoading: false,
    createModel: Object.assign({}, negotiationModel)
  }),
  actions: {
    async getNegotiationTypes() {
      try {
        let { data } = await fetchNegotiationTypes()
        this.negotiationTypes = data.results
      }
      catch(error) {

      }
    },
    /**
     *
     */
    async getNegotiationSubTypes(params) {
      try {
        let { data } = await fetchNegotiationSubTypes(params)
        this.negotiationSubTypes = data.results
      }
      catch(error) {

      }
    },
    /**
     *
     */
    async getNegotiations() {
      try {
        let { data } = await fetchNegotiationList()
        this.createdList = data.results
      }
      finally {

      }
    },
    /**
     *
     */
    async getNegotiationsById({ id, params = {} }) {
      try {
        this.formLoading = true

        let { data } = await fetchNegotiationById({ id, params })
        this.createModel.title = data.title
        this.createModel.doc_type = data.doc_type.id
        this.createModel.doc_sub_type = data.doc_sub_type.id
        this.createModel.content = data.content
        this.createModel.__users = data.users
      }
      finally {
        setTimeout(() => {
          this.formLoading = false
        }, 500);
      }
    },
    /**
     *
     */
    async getNegotiators(params) {
      try {
        let { data } = await fetchNegotiators(params)
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject()
      }
      finally {

      }
    },
    /**
     *
     */
    async getNegotiatorsNotSigned(params) {
      try {
        let { results } = await this.getNegotiators(params)
        this.notSignedList = results
      }
      finally {

      }
    },
    /**
     *
     */
    async getNegotiatorsSigned(params) {
      try {
        let { results } = await this.getNegotiators(params)
        this.signedList = results
      }
      finally {

      }
    },
    /**
     *
     */
    async signNegotiatorsNotSigned(value) {
      try {
        await fetchSignNegotiators({ ids: value })
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async getNegotiationInstances(params) {
      try {
        let { data } = await fetchNegotiationInstances(params)
      }
      finally {

      }
    },
    /**
     *
     */
    async createNegotiation() {
      try {
        let model = {
          ...this.createModel,
          users: this.createModel.__users.map(user => user.id)
        }

        await fetchNegotiationCreate(model)
        this.createModel = Object.assign({}, negotiationModel)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
  }
})
