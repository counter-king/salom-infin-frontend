// Core
import { defineStore } from 'pinia'
// Utils
import { helpers, required } from "@vuelidate/validators"
import {adjustUserObjectToArray, setValuesToKeys} from "@/utils"
import { withAsync } from "@/utils/withAsync"
// Enums
import {COMPOSE_DOCUMENT_TYPES, JOURNAL, SIGNER_TYPES} from "@/enums"
// Store
import { useUsersStore } from "@/stores/users.store"
// Services
import {
  fetchCreateDocument, fetchGetDocumentDetail,
  fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service"
import { useAuthStore } from '@/modules/Auth/stores'
import {fetchUserDetail} from "@/services/users.service";

export const useSDOrderStore = defineStore("order-store", {
  state: () => {
    const authStore = useAuthStore()

    return {
      buttonLoading: false,
      detailLoading: false,

      model: {
        content: null,
        company: authStore.currentUser.company.id,
        curator: null,
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
        document_sub_type: null,
        register_number: null,
        register_date: null,
        approvers: [],
        journal: JOURNAL.ORDERS_PROTOCOLS,
        sender: null,
        signers: [],
        files: [],
        trip_notice_id: null,
        __files: [],
        __approvers: [],
        __approvers_copy: [],
        __curator: null,
        // __signers: [],
        __negotiators: []
      },
      rules: {
        register_number: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        register_date: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        content: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        __negotiators: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        // __approvers: {
        //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
        // },
        __curator: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        // __signers: {
        //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
        // },
      }
    }
  },
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
        this.model.__signers = await adjustUserObjectToArray(data.signers.filter(item => item.type !== SIGNER_TYPES.NEGOTIATOR))
        this.model.__negotiators = await adjustUserObjectToArray(data.signers.filter(item => item.type === SIGNER_TYPES.NEGOTIATOR))
        this.model.__approvers = await adjustUserObjectToArray(data.approvers)
        this.model.__curator = await adjustUserObjectToArray([], data.curator.id, false)
      } catch (err) {

      }
      finally {
        this.detailLoading = false
      }
    }
  }
})
