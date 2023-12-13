// Core
import { defineStore } from 'pinia';
import {helpers, required} from "@vuelidate/validators";

export const useSDStoreInner = defineStore("sd-store-inner", {
  state: () => ({
    model: {
      content: null,
      document_type: null,
      register_number: null,
      short_description: null,
      title: null,
      approvers: [],
      departments: [],
      signers: [],
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
  })
})
