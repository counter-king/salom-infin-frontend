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
import {SD_TYPE_APPLICATION, SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants"
import {setValuesToKeys} from "@/utils"
import {useCommonStore} from "@/stores/common";
import {useUsersStore} from "@/stores/users.store";

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
      document_sub_type: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __approvers: {

      },
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

      } finally {
        this.buttonLoading = false;
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id){
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__approvers = data.approvers
        this.model.__files = data.files
        this.model.__curator = useUsersStore().usersList.find(item => item.id === data.curator.id)
        this.model.__signers = data.signers
      }
      catch (error) {

      }
      finally {
        this.detailLoading = false;
      }
    }
  }
})
