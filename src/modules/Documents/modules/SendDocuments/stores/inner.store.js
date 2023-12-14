// Core
import { defineStore } from 'pinia';
// Utils
import {helpers, required} from "@vuelidate/validators";
import {withAsync} from "@/utils/withAsync";
// Services
import {fetchCreateDocument} from "@/modules/Documents/modules/SendDocuments/services/index.service";
import {SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";

export const useSDStoreInner = defineStore("sd-store-inner", {
  state: () => ({
    buttonLoading: false,
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
      this.buttonLoading = true;
      const { response, error } = await withAsync(fetchCreateDocument, body);
      if (response){
        this.buttonLoading = false;
        return Promise.resolve(response);
      } else {
        return Promise.reject(error);
      }
    }
  }
})
