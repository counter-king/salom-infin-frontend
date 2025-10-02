import { defineStore } from 'pinia'
import {
  fetchRoleById,
  fetchDeleteRole
} from '../services/role.service'
import {
  fetchAssignmentRoleCreate,
  fetchAssignmentRoleList,
  fetchAssignmentRoleUpdate,
  fetchAssignmentRoleDelete
} from '../services/assignment-roles.service'

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
        header: 'employee',
        field: 'user',
        active: true
      },
      {
        header: 'roles',
        field: 'role',
        active: true
      },
      {
        header: 'start-date',
        field: 'valid_from',
        active: true
      },
      {
        header: 'end-date',
        field: 'valid_until',
        active: true
      },
      {
        header: 'change-time',
        field: 'modified_date',
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
    createModel: JSON.parse(JSON.stringify(model)),
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
        user: this.createModel.__user.id
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
      let model = {
        ...this.createModel,
        role: this.createModel.__role.id,
        user: this.createModel.__user.id
      }

      try {
        await fetchAssignmentRoleUpdate(model.id, model)
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
    async deleteAssignmentRole(id) {
      try {
        await fetchAssignmentRoleDelete(id)
      }
      finally {

      }
    },
    /**
     *
     *
     */
    setRole(payload) {
      this.createModel = {
        ...payload,
      }
    }
  }
})
