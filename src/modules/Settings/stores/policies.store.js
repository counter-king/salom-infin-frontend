import { defineStore } from 'pinia'
import {
  fetchListPolicies,
  fetchByIdPolicies,
  fetchCreatePolicies,
  fetchUpdatePolicies,
  fetchDeletePolicies
} from '../services/policies.service'

let model = {
  id: null,
  role: null,
  __role: null,
  resource: null,
  __resource: null,
  action: null,
  __action: null,
  effect: null,
  __effect: null,
  condition_kind: 'none',
  param_departments: {},
  param_owner_field: '',
  param_time_start_hhmm: '10:00',
  param_time_end_hhmm: '18:00',
  param_journal_ids: {},
  param_doc_type_ids: {},
  param_doc_sub_type_ids: {},
  param_advanced_ast: {},
  valid_from: null,
  valid_until: null,
  org_key: '',
  priority: 0,
  enabled: true
}

export const usePoliciesStore = defineStore('policies-stores', {
  state: () => ({
    list: [],
    headers: [
      {
        header: 'name-role',
        field: 'role',
        active: true
      },
      {
        header: 'resource-name',
        field: 'resource',
        active: true
      },
      {
        header: 'method-name',
        field: 'action',
        active: true
      },
      {
        header: 'permission',
        field: 'effect',
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
    createModel: JSON.parse(JSON.stringify(model))
  }),
  actions: {
    async actionListPolicies(params = {}) {
      let { data } = await fetchListPolicies(params)
      this.list = data.results
      this.totalCount = data.count
    },
    /**
     *
     */
    async actionByIdPolicies(id) {
      let { data } = await fetchByIdPolicies(id)
      this.actionSetRole(data)
    },
    /**
     *
     */
    async actionCreatePolicies() {
      let model = {
        ...this.createModel,
        role: this.createModel.__role.id,
        resource: Number(Object.keys(this.createModel.__resource)[0]),
        action: this.createModel.__action.id,
        effect: this.createModel.__effect.value,
      }

      try {
        await fetchCreatePolicies(model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async actionUpdatePolicies() {
      let model = {
        ...this.createModel,
        role: this.createModel.__role.id,
        resource: Number(Object.keys(this.createModel.__resource)[0]),
        action: this.createModel.__action.id,
        effect: this.createModel.__effect.value,
      }

      try {
        await fetchUpdatePolicies(model.id, model)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
     */
    async actionDeletePolicies(id) {
      try {
        await fetchDeletePolicies(id)
      }
      finally {

      }
    },
    /**
     *
     */
    actionSetRole(payload) {
      this.createModel = {
        ...payload,
        __role: payload.role,
        __resource: {
          [payload.resource.id]: true
        },
        __action: payload.action,
        __effect: payload.effect === 'allow'
          ? { name: 'Ruxsat berish', value: 'allow' }
          : { name: 'Rad etish', value: 'deny' },
      }
    },
    /**
     *
     */
    actionResetModel() {
      this.createModel = JSON.parse(JSON.stringify(model))
    }
  }
})
