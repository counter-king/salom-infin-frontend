// Core
import { defineStore } from 'pinia'
// Services
import { fetchUserOne, fetchUserSetPermissions } from '../../services/users/employees.service'

let model = {
  permissions: []
}

export const useEmployeeStore = defineStore('employees-stores', {
  state: () => ({
    createModel: Object.assign({}, model),
    userOne: {}
  }),
  actions: {
    async getUserOne(id) {
      try {
        let { data } = await fetchUserOne(id)
        this.userOne = data
        this.createModel.permissions = data.permissions.map(permission => permission.id)
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
    async userSetPermissions(id) {
      try {
        await fetchUserSetPermissions(id, this.createModel)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    }
  }
})
