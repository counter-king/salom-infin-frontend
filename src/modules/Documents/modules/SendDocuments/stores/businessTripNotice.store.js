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
import {
  adjustCompanyObjectToArray, adjustTagObjectToArray,
  adjustTopSignerObjectToArray,
  adjustUserObjectToArray,
  setValuesToKeys
} from "@/utils"
// Enums
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums"
// Store
import { useAuthStore } from '@/modules/Auth/stores'

export const useSDBTNoticeStore = defineStore("sd-notice-store", {
  state: () => {
    const authStore = useAuthStore()

    return {
      buttonLoading: false,
      detailLoading: false,

      model: {
        approvers: [],
        company: null,
        content: null,
        curator: null,
        document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP,
        journal: JOURNAL.INNER,
        notices: [],
        start_date: null,
        end_date: null,
        short_description: null,
        route: null,
        companies: [],
        sender: null,
        signers: [],
        files: [],
        __curator: null,
        __employees: [],
        __companies: [],
        __tags: [],
        __approvers: [],
        __signers: [],
        __files: []
      },
      rules: {
        end_date: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        start_date: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        route: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        content: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        __companies: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        __curator: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        __employees: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        // __approvers: {
        //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
        // },
        __signers: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        __tags: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        short_description: {
          required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
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
    async actionGetDocumentDetailForUpdate(id, fill = false) {
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        setValuesToKeys(this.model, data)
        this.model.__companies = []
        this.model.__curator = await adjustTopSignerObjectToArray([], data.curator.id, false)
        this.model.__employees = await adjustUserObjectToArray(data.notices)
        if (fill) {
          this.model.__approvers =  await adjustUserObjectToArray(data.approvers.filter(item => item?.user?.id !== data?.curator?.assistant))
          this.model.register_number = null
        } else {
          this.model.__approvers =  await adjustUserObjectToArray(data.approvers)
        }
        this.model.__signers =  await adjustUserObjectToArray(data.signers)
        this.model.__companies = await adjustCompanyObjectToArray(data.notices[0].destinations)
        this.model.__tags = await adjustTagObjectToArray(data.tags)
        this.model.start_date = data.notices[0].start_date
        this.model.end_date = data.notices[0].end_date
        this.model.__tags = data.tags
        this.model.route = data.notices[0].route
      } catch (err) {

      } finally {
        this.detailLoading = false
      }
    }
  }
})
