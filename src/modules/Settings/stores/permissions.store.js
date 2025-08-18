// Core
import { defineStore } from 'pinia'
// Service
import {
  fetchListPermission,
  fetchCreatePermission,
  fetchUpdatePermission,
  fetchDeletePermission
} from '../services/permissions.service'
// Utils
import { setValuesToKeys } from '../../../utils'

const model = {
  name_uz: null,
  name_ru: null,
  parent: null,
  children: [],
  url_path: null,
  url_name: null,
  method: 'GET',
  value: null,
  content_type: null,
  __url: null,
  journal: null,
  doc_type: null,
  doc_sub_type: null
}

export const usePermissionStore = defineStore('permission-stores', {
  state: () => ({
    list: [],
    createModel: Object.assign({}, model)
  }),
  getters: {
    getContentPermission: state => id => state.list.find(item => item.id === id)
  },
  actions: {
    async listPermission() {
      let { data } = await fetchListPermission()
      this.list = data.results
    },
    /**
     *
    */
    async createPermission({ item, list }) {
      const model = {
        ...this.createModel,
        parent: item?.id
      }

      try {
        let { data } = await fetchCreatePermission(model)
        list.push(data)
        return Promise.resolve(data)
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
    */
    async updatePermission({ item, id, index, list }) {
      try {
        await fetchUpdatePermission(id, item)
        list.splice(index, 1, item)
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
    */
    async deletePermission({ id, index, list, emit = () => void 0 }) {
      try {
        await fetchDeletePermission(id)
        list.splice(index, 1)
        emit()
        return Promise.resolve()
      }
      catch(error) {
        return Promise.reject()
      }
    },
    /**
     *
    */
    setPermission(payload) {
      setValuesToKeys(this.createModel, payload)

      this.createModel.__url = {
        url: this.createModel.url_path,
        name: this.createModel.url_name,
        content_type: this.createModel.content_type
      }
    }
  }
})
