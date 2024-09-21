// Core
import { defineStore } from 'pinia'
// Services
import { fetchUserSetPermissions } from '../../services/users/employees.service'

let model = {
  permissions: []
}

export const useEmployeeStore = defineStore('employees-store', {
  state: () => ({
    createModel: Object.assign({}, model),
  }),
  actions: {
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
