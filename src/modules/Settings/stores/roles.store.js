// Core
import { defineStore } from 'pinia'
// Service
import {
  fetchListRole,
  fetchCreateRole,
  fetchUpdateRole,
  fetchDeleteRole
} from '../services/role.service'

let model = {
  name_uz: null,
  name_ru: null,
  is_active: true
}

export const useRolesStore = defineStore('roles-store', {
  state: () => ({
    list: [],
    headers: [
      {
        header: 'Наименование',
        field: 'name',
        active: true
      },
      {
        header: 'Создано',
        field: 'created_date',
        active: true
      },
      {
        header: 'Действия',
        field: 'actions',
        active: true,
        class: 'w-[125px]'
      }
    ],
    count: 0,
    contentLoading: false,
    createModel: Object.assign({}, model)
  }),
  actions: {
    async actionGetList() {
      let { data } = await fetchListRole()
      this.list = data.results
    },
    /**
     *
     *
    */
    async createRole() {
      try {
        await fetchCreateRole(this.createModel)
      }
      finally {

      }
    },
    /**
     *
     *
    */
    async updateRole() {
      try {
        await fetchUpdateRole(this.createModel)
      }
      finally {

      }
    },
    /**
     *
     *
    */
    async deleteRole() {
      try {
        await fetchDeleteRole(this.createModel)
      }
      finally {

      }
    },
  }
})
