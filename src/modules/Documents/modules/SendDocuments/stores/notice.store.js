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

export const useSDNoticeStore = defineStore("sd-notice-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

  })
})
