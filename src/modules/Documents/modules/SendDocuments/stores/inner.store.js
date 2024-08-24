// Core
import { defineStore } from 'pinia';
// Utils
import {helpers, required} from "@vuelidate/validators";
import {withAsync} from "@/utils/withAsync";
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentDetail, fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service";
import {SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";
import logger from "quill/core/logger";
import {adjustDepartmentObjectToArray, adjustUserObjectToArray, setValuesToKeys} from "@/utils";
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums";
import {useAuthStore} from "@/modules/Auth/stores";

export const useSDStoreInner = defineStore("sd-stores-inner", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
    model: {
      company: useAuthStore().currentUser?.company?.id,
      content: null,
      document_type: COMPOSE_DOCUMENT_TYPES.INNER,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER,
      register_number: null,
      short_description: null,
      title: null,
      approvers: [],
      journal: JOURNAL.INNER,
      departments: [],
      sender: null,
      signers: [],
      files: [],
      __files: [],
      __approvers: [],
      __approvers_copy: [],
      __departments: [],
      __signers: [],
      __signers_copy: []
    },
    rules: {
      register_number: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      short_description: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __departments: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __approvers: {

      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
    }
  }),
  actions: {
    async actionCreateDocument(body) {
      let model = {
        ...body,
        type: SD_TYPE_INNER,
        sub_type: SD_TYPE_INNER
      }
      this.buttonLoading = true;
      const { response, error } = await withAsync(fetchCreateDocument, model);
      if (response){
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
        this.buttonLoading = false
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id){
      try {
        this.detailLoading = true;
        const { data } = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__approvers =  await adjustUserObjectToArray(data.approvers)
        this.model.__signers =  await adjustUserObjectToArray(data.signers)
        this.model.__departments = await adjustDepartmentObjectToArray(data.receiver.departments)
        this.model.__files = data.files
      }
      catch (error) {

      }
      finally {
        this.detailLoading = false
      }
    }
  }
})
