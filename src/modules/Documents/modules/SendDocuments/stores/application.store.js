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
import {adjustUserObjectToArray, setValuesToKeys} from "@/utils"
import {useUsersStore} from "@/stores/users.store";
import {fetchUserDetail} from "@/services/users.service";
import {SIGNER_TYPES} from "@/enums";

export const useSDStoreApplication = defineStore("sd-store-application", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
    model: {
      content: null,
      curator: null,
      document_type: null,
      approvers: [],
      journal: null,
      sender: null,
      signers: [],
      document_sub_type: null,
      files: [],
      __files: [],
      __approvers: [],
      __approvers_copy: [],
      __curator: null,
      __departments: [],
      __signers: [],
      __signers_copy: []
    },
    rules: {
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __approvers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      // __approvers: {

      // },
      __signers: {

      },
    },
  }),
  actions: {
    async actionCreateDocument(body) {
      let model = {
        ...body,
      }
      this.buttonLoading = true;
      const {response, error} = await withAsync(fetchCreateDocument, model);
      if (response) {
        this.buttonLoading = false;
        return Promise.resolve(response);
      } else {
        this.buttonLoading = false
        return Promise.reject(error);
      }
    },
    /** **/
    async actionUpdateDocument({ id, body }) {
      try {
        this.buttonLoading = true;
        const { data } = await fetchUpdateDocument({ id, body });
        return Promise.resolve(data);
      } catch (err) {
        this.buttonLoading = false
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id){
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.__signers = await adjustUserObjectToArray(data.signers.filter(item => item.type === SIGNER_TYPES.SIGNER))
        this.model.__curator = await adjustUserObjectToArray([], data.curator.id, false)
        this.model.__files = data.files
      }
      catch (error) {

      }
      finally {
        this.detailLoading = false;
      }
    }
  }
})
