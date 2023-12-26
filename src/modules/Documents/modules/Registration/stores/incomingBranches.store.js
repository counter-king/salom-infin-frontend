// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegIncomingBranches = defineStore("reg-incoming-branches", {
  state: () => ({
    detailModel: {
      document_type: null,
      register_number: null,
      outgoing_date: null,
      author: null,
      branch: null,
      journal: JOURNAL.INNER,
      description: null,
      __copy_prototype: null
    },
    createFormModel: {
      document_type: null,
      register_number: null,
      outgoing_date: null,
      author: null,
      branch: null,
      description: null,
      journal: JOURNAL.INNER,
    }
  }),
  actions: {
    /*
    *
    * */
    async actionCreateIncomingDocument(payload) {
      let { data } = await fetchCreateDocument(payload)
      console.log(data);
    }
  }
})
