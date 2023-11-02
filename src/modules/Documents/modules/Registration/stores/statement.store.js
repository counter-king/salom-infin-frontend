// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegStatement = defineStore("reg-incoming", {
  state: () => ({
    detailModel: {
      outgoing_date: null,
      correspondent: null,
      author: null,
      __reviewers: [],

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
