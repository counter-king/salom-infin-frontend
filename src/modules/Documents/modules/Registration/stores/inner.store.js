// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegInner = defineStore("reg-incoming", {
  state: () => ({
    detailModel: {
      register_number: null,
      outgoing_date: null,
      document_type: null,
      __department: [],
      __signers: [],
      reviewers: [],
      __reviewers: [],
      correspondent: null,
      author: null,
      journal: JOURNAL.INNER,
    },
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
