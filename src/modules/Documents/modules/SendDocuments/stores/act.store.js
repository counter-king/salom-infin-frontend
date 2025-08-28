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
import { adjustTopSignerObjectToArray, adjustUserObjectToArray, setValuesToKeys } from "@/utils"

export const useActStore = defineStore("act-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

    model: {
      approvers: [],
      company: null,
      content: null,
      curator: null,
      files: [],
      document_type: null,
      document_sub_type: null,
      journal: null,
      signers: [],
      sender: null,
      short_description: null,
      __approvers: [],
      __curator: null,
      __files: [],
      __parent: null,
      __signers: [],
      __user: null
    },
    rules: {
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      }
    },
    defaultText: '\n <p style="font-size: 14px;">&nbsp; &nbsp; &ldquo;Oʼzsanoatqurilishbank&rdquo; АTB (keyingi oʼrinlarda Buyurtmachi) va fuqaro ___________________________ (keyingi oʼrinlarda Ijrochi) oʼrtasida 2025-yil _________ kuni imzolangan №__-sonli &ldquo;Haq evaziga xizmat koʼrsatish shartnomasi&rdquo;ga asosan Ijrochi tomonidan 2025-yil _______ oyi uchun quyidagi ishlar amalga oshirildi va Buyurtmachi tomonidan qabul qilindi:</p> <p style="font-size: 14px;">Amalga oshirilgan ishlar hajmi:</p> <p style="font-size: 14px;">1.&nbsp;</p>'
  }),
  actions: {
    async actionCreateDocument(body) {
      this.buttonLoading = true
      const { response, error} = await withAsync(fetchCreateDocument, body)
      if (response) {
        this.buttonLoading = false
        return Promise.resolve(response)
      } else {
        this.buttonLoading = false
        return Promise.reject(error)
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id) {
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__curator = await adjustTopSignerObjectToArray([], data.curator.id, false)
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.__signers = await adjustUserObjectToArray(data.signers)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.detailLoading = false
      }
    },
    /** **/
    async actionUpdateDocument({id, body}) {
      try {
        this.buttonLoading = true
        const {data} = await fetchUpdateDocument({id, body})
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.buttonLoading = false
      }
    },
  }
})
