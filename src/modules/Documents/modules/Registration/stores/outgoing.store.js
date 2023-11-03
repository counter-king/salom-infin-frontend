// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegOutgoing = defineStore("reg-outgoing", {
  state: () => ({
    detailModel: {
      register_number: null,
      outgoing_date: null,
      document_type: null,
      __department: [],
      __signers: [],
      correspondent: null,
      author: null,
      description: null,
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
