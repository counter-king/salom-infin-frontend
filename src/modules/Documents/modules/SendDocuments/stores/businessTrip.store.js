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
import { COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL } from "@/enums"
import {
  CaseBoldIcon,
  DocumentTextBoldIcon, LocalTaxiIcon, PlaneIcon,
  Routing2BoldIcon, TrainIcon
} from "@/components/Icons";
import {
  STEPPER_ROUTE,
  STEPPER_TRIP_INFO,
  STEPPER_WORK_PLAN
} from "@/modules/Documents/modules/SendDocuments/constants"

export const useBusinessTripStore = defineStore("sd-business-trip-store", {
  state: () => ({
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
    },
    stepperItems: [
      {
        id: 1,
        label: 'trip-info',
        icon: CaseBoldIcon,
        active: true,
        value: STEPPER_TRIP_INFO
      },
      {
        id: 2,
        label: 'work-plan',
        icon: DocumentTextBoldIcon,
        active: false,
        value: STEPPER_WORK_PLAN
      },
      {
        id: 3,
        label: 'route',
        icon: Routing2BoldIcon,
        active: false,
        value: STEPPER_ROUTE
      }
    ],
    routeTabItems: [
      {
        id: 1,
        title: 'airplane',
        icon: PlaneIcon,
        active: true
      },
      {
        id: 2,
        title: 'train',
        icon: TrainIcon,
        active: false
      },
      {
        id: 3,
        title: 'taxi',
        icon: LocalTaxiIcon,
        active: false
      }
    ],
    routeTypeTabItems: [
      {
        id: 1,
        title: 'there-back',
        icon: PlaneIcon,
        active: true
      },
      {
        id: 2,
        title: 'complex-route',
        icon: TrainIcon,
        active: false
      },
      {
        id: 3,
        title: 'one-way',
        icon: LocalTaxiIcon,
        active: false
      }
    ]
  })
})
