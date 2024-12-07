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
import { adjustObjectToArray, adjustTopSignerObjectToArray, adjustUserObjectToArray, setValuesToKeys } from "@/utils";

export const usePOAStore = defineStore("power-of-attorney", {
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
      parent: null,
      signers: [],
      start_date: null,
      end_date: null,
      sender: null,
      short_description: null,
      user: null,
      __approvers: [],
      __curator: null,
      __files: [],
      __parent: null,
      __signers: [],
      __user: null
    },
    rules: {
      end_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      start_date: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      // short_description: {
      //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
      // },
      __user: {
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
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id) {
      try {
        this.detailLoading = true
        const {data} = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__curator = await adjustTopSignerObjectToArray([], data.curator.id, false)
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.__signers = await adjustUserObjectToArray(data.signers)
        this.model.__user = await adjustObjectToArray('users/personal-information', [], false, data.user.id)
        this.model.__parent = data.parent
        return Promise.resolve(data)
      } catch (err) {

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

      } finally {
        this.buttonLoading = false
      }
    },
  }
})
