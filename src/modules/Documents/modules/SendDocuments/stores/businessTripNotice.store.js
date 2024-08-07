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

export const useSDBTNoticeStore = defineStore("sd-notice-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

    model: {
      employees: [],
      __employees: [],
      companies: [],
      __companies: [],
      start_date: null,
      end_date: null,
      targets: [],
      __targets: [],
      approvers: [],
      __approvers: [],
      signers: [],
      __signers: [],
      __files: [],
      road: null,
      content: null
    },
    rules: {
      end_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      start_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      road: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __companies: {
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
      __targets: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
    }
  })
})
