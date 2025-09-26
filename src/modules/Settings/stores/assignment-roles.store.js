import { defineStore } from 'pinia'
import {
  fetchRoleById,
  fetchDeleteRole
} from '../services/role.service'
import {
  fetchAssignmentRoleCreate,
  fetchAssignmentRoleList,
  fetchAssignmentRoleUpdate
} from '../services/assignment-roles.service'
import { setValuesToKeys } from '@/utils'

let model = {
  id: null,
  role: null,
  __role: null,
  user: [],
  __user: [],
  org_key: '',
  valid_from: null,
  valid_until: null,
  enabled: true,
}

export const useAssignmentRolesStore = defineStore('assignment-roles-stores', {
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
    async getAssignmentRoleList(params = {}) {
      let { data } = await fetchAssignmentRoleList(params)
      this.list = data.results
      this.totalCount = data.count
    },
    /**
     *
     *
     */
    async getRoleById(id) {
      let { data } = await fetchRoleById(id)
      this.setRole(data)
    },
    /**
     *
     *
     */
    async createAssignmentRole() {
      let model = {
        ...this.createModel,
        role: this.createModel.__role.id,
        user: this.createModel.__user.map(user => user.id),
      }

      try {
        await fetchAssignmentRoleCreate(model)
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
    async updateAssignmentRole() {
      try {
        await fetchAssignmentRoleUpdate(this.createModel.id, this.createModel)
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
