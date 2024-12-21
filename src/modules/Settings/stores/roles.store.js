// Core
import { defineStore } from 'pinia'
// Service
import {
  fetchListRole,
  fetchOneRole,
  fetchCreateRole,
  fetchUpdateRole,
  fetchDeleteRole
} from '../services/role.service'
// Utils
import { setValuesToKeys } from '../../../utils'

let model = {
  id: null,
  name: null,
  permissions: [],
  is_active: true
}

export const useRolesStore = defineStore('roles-store', {
  state: () => ({
    list: [],
    headers: [
      {
        header: 'naming',
        field: 'name',
        active: true
      },
      {
        header: 'created-date',
        field: 'created_date',
        active: true
      },
      {
        header: 'actions',
        field: 'actions',
        active: true,
        class: 'w-[150px]'
      }
    ],
    totalCount: 0,
    contentLoading: false,
    createModel: Object.assign({}, model),
    selected: []
  }),
  actions: {
    async actionGetList(params = {}) {
      let { data } = await fetchListRole(params)
      this.list = data.results
      this.totalCount = data.count
    },
    /**
     *
     *
    */
   async getOneRole(id) {
      let { data } = await fetchOneRole(id)
      this.setRole(data)
      this.createModel.permissions = data.permissions.map(permission => permission.id)
   },
    /**
     *
     *
    */
    async createRole() {
      try {
        await fetchCreateRole(this.createModel)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     *
    */
    async updateRole() {
      try {
        await fetchUpdateRole(this.createModel.id, this.createModel)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
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
    /**
     *
     *
    */
    setRole(payload) {
      setValuesToKeys(this.createModel, payload)
    }
  }
})
