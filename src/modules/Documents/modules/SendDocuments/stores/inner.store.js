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
import {setValuesToKeys} from "@/utils";

export const useSDStoreInner = defineStore("sd-store-inner", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
    model: {
      content: null,
      document_type: null,
      register_number: null,
      short_description: null,
      title: null,
      approvers: [],
      departments: [],
      signers: [],
      type: SD_TYPE_INNER,
      sub_type: SD_TYPE_INNER,
      sender: null,
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
      title: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      short_description: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      document_type: {
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
        this.buttonLoading = false;
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id){
      try {
        this.detailLoading = true;
        const { data } = await fetchGetDocumentDetail(id);
        setValuesToKeys(this.model, data);
        this.model.__departments = data.receiver.departments;
        this.model.__signers = data.signers;
        this.model.__approvers = data.approvers;
        console.log(this.model)
      }
      catch (error) {

      }
      finally {
        this.detailLoading = false;
      }
    }
  }
})
