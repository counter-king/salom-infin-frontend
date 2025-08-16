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


export const useSDBTDecreeStore = defineStore("sd-decree-stores", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

    model: {
      approvers: [],
      bookings: null,
      company: null,
      content: null,
      curator: null,
      document_type: null,
      document_sub_type: null,
      journal: null,
      notices: [],
      start_date: null,
      end_date: null,
      short_description: null,
      sender: null,
      signers: [],
      files: [],
      trip_plans: null,
      __groups: [
        {
          __users: null,
          __tags: null,
          __regions: null,
          __start_date: null,
          __end_date: null
        }
      ],
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
      __groups: {
        $each: helpers.forEach({
          __users: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __tags: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __regions: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __start_date: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __end_date: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
        }),
      }
    },
    trip_plan_model: {
      trip_plans: [
        {
          users: null,
          text: null
        }
      ],
    },
    trip_plan_rules: {
      trip_plans: {
        $each: helpers.forEach({
          users: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          text: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
        })
      }
    },
  }),
  actions: {
    actionAddGroupBlock() {
      this.model.__groups.push({
        __users: null,
        __tags: null,
        __regions: null,
        __start_date: null,
        __end_date: null
      })
    },
    /** **/
    actionDeleteGroupBlock(index) {
      this.model.__groups.splice(index, 1)
    },
    /** **/
    actionDeleteWorkPlanRow(index) {
      this.trip_plan_model.trip_plans.splice(index, 1)
    },
    /** **/
    actionAddWorkPlanRow() {
      this.trip_plan_model.trip_plans.push({
        users: null,
        text: null
      })
    },
    /** **/
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
        const {data} = await fetchUpdateDocument({id, body: body})
        return Promise.resolve(data)
      } catch (err) {

      } finally {
        this.buttonLoading = false
      }
    },
  }
})
