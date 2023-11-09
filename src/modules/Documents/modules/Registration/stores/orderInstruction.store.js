// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegOrderInstruction = defineStore("reg-order-instruction", {
  state: () => ({
    detailModel: {
      name_document: null,
      register_number: null,
      outgoing_date: null,
      magazine: null,
      __department: [],
      document_type: null,
      reviewers: [],
      __reviewers: [],
      description: null,
      journal: JOURNAL.ORDERS_PROTOCOLS,
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
