// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegOrderInstruction = defineStore("reg-incoming", {
  state: () => ({
    detailModel: {
      name_document: null,
      register_number: null,
      outgoing_date: null,
      magazine: null,
      __department: [],
      document_type: null,
      __reviewers: [],
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
