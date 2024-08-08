// Core
import { defineStore } from 'pinia'
// Utils
import { helpers, required } from "@vuelidate/validators"
import { withAsync } from "@/utils/withAsync"
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentDetail, fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service"
import {setValuesToKeys} from "@/utils"
import {useUsersStore} from "@/stores/users.store"
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums";

export const useSDBTNoticeStore = defineStore("sd-notice-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

    model: {
      approvers: [],
      company: 16,
      content: null,
      curator: null,
      document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP,
      journal: JOURNAL.INNER,
      notices: [],
      start_date: null,
      end_date: null,
      route: null,
      companies: [],
      sender: null,
      signers: [],
      tags_ids: [],
      files: [],
      __curator: null,
      __employees: [],
      __companies: [],
      __tags: [],
      __approvers: [],
      __signers: [],
      __files: []
    },
    rules: {
      end_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      start_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      route: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __companies: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __employees: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __approvers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __tags: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
    }
  }),
  actions: {
    async actionCreateDocument(body) {
      this.buttonLoading = true
      const {response, error} = await withAsync(fetchCreateDocument, body)
      if (response) {
        this.buttonLoading = false
        return Promise.resolve(response)
      } else {
        this.buttonLoading = false
        return Promise.reject(error)
      }
    }
  }
})
