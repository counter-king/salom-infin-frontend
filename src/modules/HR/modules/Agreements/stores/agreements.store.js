// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchNegotiationTypes,
  fetchNegotiationSubTypes,
  fetchNegotiationList,
  fetchNegotiationById,
  fetchNegotiators,
  fetchNegotiationCreate
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
        header: 'Название документа',
        field: 'name',
        active: true
      },
      {
        header: 'Статус',
        field: 'status',
        active: true
      },
      {
        header: 'Дата',
        field: 'date',
        active: true
      },
    ],
    notSignedList: [],
    notSignedCount: 0,
    signedList: [],
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
     *
     */
    async getNegotiationsById({ id, params = {} }) {
      try {
        this.formLoading = true

        let { data } = await fetchNegotiationById({ id, params })
        this.createModel.title = data.title
        this.createModel.doc_type = data.doc_type
        this.createModel.doc_sub_type = data.doc_sub_type
        this.createModel.content = data.content
        console.log(data)
      }
      finally {
        setTimeout(() => {
          this.formLoading = false
        }, 500);
      }
    },
    /**
     *
     *
     */
    async getNegotiators(params) {
      console.log(params)
      try {
        let { data } = await fetchNegotiators(params)
        console.log(data.results)
        // this.createdList = data.results
      }
      finally {

      }
    },
    /**
     *
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
    }
  }
})
