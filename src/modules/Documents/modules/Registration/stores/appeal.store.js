// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateDocument } from '../services/docflow.service'
// Utils
import { JOURNAL } from '@/enums'
// Utils
export const useRegAppeal = defineStore("reg-appeal", {
  state: () => ({
    detailModel: {
      outgoing_number: null,
      outgoing_date: null,
      correspondent: null,
      applicant: null,
      region:null,
      area:null,
      full_name_applicant: null,
      address: null,
      phone_number: null,
      submission_form: null,
      type_complaint:null,
      reviewers: [],
      __reviewers: [],
      duplicateSwitch: false,
      repeated_application: true,
      description: null,
      journal: JOURNAL.APPEALS,
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
