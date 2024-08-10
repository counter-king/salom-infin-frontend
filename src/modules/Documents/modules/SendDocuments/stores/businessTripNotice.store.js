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
import {setValuesToKeys} from "@/utils"
import {useUsersStore} from "@/stores/users.store"
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums";
import {useCommonStore} from "@/stores/common";

export const useSDBTNoticeStore = defineStore("sd-notice-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,

    model: {
      approvers: [],
      company: 16,
      content: null,
      curator: null,
      document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP,
      journal: JOURNAL.INNER,
      notices: [],
      start_date: null,
      end_date: null,
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
      __approvers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __tags: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
    }
  }),
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
    async actionGetDocumentDetailForUpdate(id) {
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        console.log(data)
        setValuesToKeys(this.model, data)
        this.model.__signers = data.signers
        this.model.__approvers = data.approvers
        this.model.__curator = useUsersStore().usersList.find(item => item.id === data.curator.id)
        this.model.__employees = data.notices.map(item => useUsersStore().usersList.find(user => user.id === item.user.id))
        this.model.__companies = data.notices[0].destinations.map(item => useCommonStore().filialList.find(f => f.id === item.id))
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
