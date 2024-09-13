// Core
import { defineStore } from 'pinia'
// Utils
import {withAsync} from "@/utils/withAsync"
import { helpers, required } from "@vuelidate/validators"
import {adjustUserObjectToArray, setValuesToKeys} from "@/utils"
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentDetail, fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service"

export const useDecreeStore = defineStore("decree-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
    model: {
      approvers: [],
      company: null,
      content: null,
      curator: null,
      document_type: null,
      document_sub_type: null,
      journal: null,
      short_description: null,
      sender: null,
      signers: [],
      files: [],
      __curator: null,
      __approvers: [],
      __signers: [],
      __files: []
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
      },
      short_description: {
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
    async actionUpdateDocument({id, body}) {
      try {
        this.buttonLoading = true;
        const {data} = await fetchUpdateDocument({id, body});
        return Promise.resolve(data);
      } catch (err) {

      } finally {
        this.buttonLoading = false;
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id) {
      try {
        this.detailLoading = true
        const {data} = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__curator = await adjustUserObjectToArray([], data.curator.id, false)
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.__signers = await adjustUserObjectToArray(data.signers)
      } catch (err) {

      } finally {
        this.detailLoading = false
      }
    }
  }
})
