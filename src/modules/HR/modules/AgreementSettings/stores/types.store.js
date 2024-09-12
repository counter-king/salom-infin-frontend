// Core
import { defineStore } from 'pinia'
import {
  fetchTypes,
  fetchTypesCreate,
  fetchTypesUpdate,
  fetchTypesDelete
} from '../services/types.service'

export const useAgreementTypes = defineStore('agreements-types', {
  state: () => ({
    headers: [
      {
        header: 'Наименование',
        field: 'name',
        active: true
      },
      {
        header: 'Категория',
        field: 'doc_type.name',
        active: true,
        class: 'w-[600px]'
      },
      {
        header: 'Дата создание',
        field: 'created_date',
        active: true,
        class: 'w-[300px]'
      },
      {
        header: 'Действия',
        field: 'actions',
        active: true,
        class: 'w-[200px]'
      }
    ],
    list: [],
    totalCount: 0
  }),
  actions: {
    async getTypes(params = {}) {
      try {
        let { data } = await fetchTypes(params)
        this.list = data.results
      }
      catch(error) {

      }
    },
    /**
     *
     */
    async createTypes(model) {
      try {
        await fetchTypesCreate(model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async updateTypes(id, model) {
      try {
        await fetchTypesUpdate(id, model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async deleteTypes(id) {
      try {
        await fetchTypesDelete(id)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    }
  }
})
