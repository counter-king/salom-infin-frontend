// Core
import { defineStore } from 'pinia'
import {
  fetchCategory,
  fetchCategoryCreate,
  fetchCategoryUpdate,
  fetchCategoryDelete
} from '../services/category.service'

export const useAgreementCategory = defineStore('agreements-category', {
  state: () => ({
    headers: [
      {
        header: 'Наименование',
        field: 'name',
        active: true
      },
      {
        header: 'Описание',
        field: 'description',
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
    async getCategories() {
      try {
        let { data } = await fetchCategory()
        this.list = data.results
      }
      catch(error) {

      }
    },
    /**
     *
     */
    async createCategories(model) {
      try {
        await fetchCategoryCreate(model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async updateCategories(id, model) {
      try {
        await fetchCategoryUpdate(id, model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async deleteCategories(id) {
      try {
        await fetchCategoryDelete(id)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    }
  }
})
