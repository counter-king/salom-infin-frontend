// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegStatement = defineStore("reg-statement", {
  state: () => ({
    detailModel: {
      outgoing_date: null,
      correspondent: null,
      author: null,
      reviewers: [],
      __reviewers: [],
      journal: JOURNAL.APPLICATION,
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
