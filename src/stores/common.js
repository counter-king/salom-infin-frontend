// Core
import { defineStore } from 'pinia'
// Components
import {
  ArrowDownIcon,
  ArrowRightDownIcon,
  DocumentTextIcon,
  NotebookLinearIcon, NotesIcon,
  RoundAltArrowDownIcon
} from '@/components/Icons'
// Stores
import { useUserPermissionStore } from './user-permissions.store'
import { useCorrespondentStore } from './correspondent'
import { useUsersStore } from './users.store'
import { useAllUrlStore } from './all-urls.store'
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
import { usePermissionStore } from '@/modules/Settings/stores/permissions.store'
// Services
import {
  fetchComposeStatusList,
  fetchDeliveryTypesList,
  fetchDepartmentList,
  fetchDistrictList,
  fetchDocumentTypesList,
  fetchJournalsList,
  fetchLanguagesList,
  fetchPrioryList,
  fetchRegionsList,
  fetchShortDescriptionList,
  fetchStatusList,
  fetchDocumentTitlesList, fetchDocumentSubTypesList, fetchCompaniesList, fetchExpenseTypeList
} from '@/services/common.service'
// Enums
import { CORRESPONDENT, JOURNAL_CODES } from '@/enums'

export const useCommonStore = defineStore("common", {
	state: () => ({
    deliveryTypeList: [],
    departmentList: [],
    districtList: [],
    documentTypesList: [],
    documentSubTypesList: [],
    journalsList: [],
    languagesList: [],
    prioryList: [],
    regionsList: [],
    shortDescriptionList: [],
    statusList: [],
    composeStatusList: [],
    documentTitleList: [],
    expenseTypeList: [],
    filialList: []
	}),
	getters: {
		getStatusList: (state) => state.statusList,
    /*
    *
    * */
    getJournalByCode: (state) => (code) => state?.journalsList.find(journal => journal.code === code)
	},
	actions: {
		async init() {
      const userPermissionStore = useUserPermissionStore()
      const correspondent = useCorrespondentStore()
      const users = useUsersStore()
      const allUrlStore = useAllUrlStore()
      const permissionStore = usePermissionStore()

      await userPermissionStore.getUserPermisission()
      await correspondent.actionGetList({})
			await users.actionUsersList()
      await users.actionEmployeeGroupList()
      await allUrlStore.getAllUrls()
      await permissionStore.listPermission()
      this.actionDeliveryTypesList()
      this.actionDepartmentList()
      this.actionDistrictList()
      this.actionDocumentTypesList()
      this.actionDocumentSubTypesList()
      this.actionJournalsList()
      this.actionLanguagesList()
      this.actionPrioryList()
      this.actionRegionsList()
      this.actionShortDescriptionList()
      this.actionStatusList()
      this.actionComposeStatusList()
      this.actionDocumentTitlesList()
      this.actionCompaniesList()
      this.actionExpenseTypeList()
		},
    /**
     * Возвращает список вид подачи
     * @returns Array
     * */
    actionDeliveryTypesList() {
      const collectStore = useCollectRequestsStore()

      fetchDeliveryTypesList().then(({ data }) => {
        this.deliveryTypeList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDeliveryTypesList',
        fn: this.actionDeliveryTypesList,
        params: null
      })
    },
    /**
     * Возвращает список департаментов
     * @returns Array
     * */
    actionDepartmentList() {
      const collectStore = useCollectRequestsStore()

      fetchDepartmentList().then(({ data }) => {
        this.departmentList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDepartmentList',
        fn: this.actionDepartmentList,
        params: null
      })
    },
    /**
     * Возвращает список районов
     * @returns Array
     * */
    actionDistrictList() {
      const collectStore = useCollectRequestsStore()

      fetchDistrictList().then(({ data }) => {
        this.districtList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDistrictList',
        fn: this.actionDistrictList,
        params: null
      })
    },
    /**
     * Возвращает список тип документов
     * @returns Array
     * */
    actionDocumentTypesList() {
      const collectStore = useCollectRequestsStore()

      fetchDocumentTypesList().then(({ data }) => {
        this.documentTypesList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDocumentTypesList',
        fn: this.actionDocumentTypesList,
        params: null
      })
    },
    actionDocumentSubTypesList() {
      const collectStore = useCollectRequestsStore()

      fetchDocumentSubTypesList().then(({ data }) => {
        this.documentSubTypesList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDocumentSubTypesList',
        fn: this.actionDocumentSubTypesList,
        params: null
      })
    },
    /**
     * Возвращает список журналов
     * @returns Array
     * */
    actionJournalsList() {
      const collectStore = useCollectRequestsStore()

      fetchJournalsList().then(({ data }) => {
        // this.journalsList = data.results
        this.journalsList = data.results.map(journal => {
          let iconPath = null
          let permission = null

          switch (journal.code) {
            case JOURNAL_CODES.INCOMING:
              iconPath = ArrowRightDownIcon
              permission = 'registration-incoming-list'
              break;
            case JOURNAL_CODES.INNER:
              iconPath = ArrowDownIcon
              permission = 'registration-inner-list'
              break;
            case JOURNAL_CODES.OUTGOING:
              iconPath = RoundAltArrowDownIcon
              permission = 'registration-outgoing-list'
              break;
            case JOURNAL_CODES.APPEALS:
              iconPath = DocumentTextIcon
              permission = 'registration-appeals-list'
              break;
            case JOURNAL_CODES.ORDERS_PROTOCOLS:
              iconPath = NotebookLinearIcon
              permission = 'registration-orders-and-protocols-list'
              break;
            default: // APPLICATION
              iconPath = NotesIcon
              permission = 'registration-application-list'
          }

          return {
            ...journal,
            icon: iconPath,
            permission
          }
        })
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionJournalsList',
        fn: this.actionJournalsList,
        params: null
      })
    },
    /**
     * Возвращает список журналов
     * @returns Array
     * */
     actionLanguagesList() {
       const collectStore = useCollectRequestsStore()

        fetchLanguagesList().then(({ data }) => {
          this.languagesList = data.results
        })
        // Добавляем запрос в коллекцию
        collectStore.actionAddRequests({
          id: 'actionLanguagesList',
          fn: this.actionLanguagesList,
          params: null
        })
    },
    /**
     * Возвращает список приоритетов
     * @returns Array
     */
    actionPrioryList() {
      const collectStore = useCollectRequestsStore()

      fetchPrioryList().then(({ data }) => {
        this.prioryList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionPrioryList',
        fn: this.actionPrioryList,
        params: null
      })
    },
    /**
     * Возвращает список регионов
     * @returns Array
     */
    actionRegionsList() {
      const collectStore = useCollectRequestsStore()

      fetchRegionsList().then(({ data }) => {
        this.regionsList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionRegionsList',
        fn: this.actionRegionsList,
        params: null
      })
    },
    /**
     * Возвращает список кратких описаний
     * @returns Array
     * */
    async actionShortDescriptionList(params = {}) {
      const collectStore = useCollectRequestsStore()

      await fetchShortDescriptionList(params).then(({ data }) => {
        this.shortDescriptionList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionShortDescriptionList',
        fn: this.actionShortDescriptionList,
        params: null
      })
    },
    /**
     * Возвращает список статусов
     * @returns Array
     * */
    actionStatusList() {
      const collectStore = useCollectRequestsStore()

      fetchStatusList().then(({ data }) => {
        this.statusList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionStatusList',
        fn: this.actionStatusList,
        params: null
      })
		},
    /**
     * Возвращает список compose статусов
     * @returns Array
     * */
    actionComposeStatusList() {
      const collectStore = useCollectRequestsStore()

      fetchComposeStatusList().then(({ data }) => {
        this.composeStatusList = data
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionComposeStatusList',
        fn: this.actionComposeStatusList,
        params: null
      })
    },
    /**
     * Возвращает список наименование
     * @returns Array
     * */
    actionDocumentTitlesList() {
      const collectStore = useCollectRequestsStore()

      fetchDocumentTitlesList().then(({ data }) => {
        this.documentTitleList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionDocumentTitlesList',
        fn: this.actionDocumentTitlesList,
        params: null
      })
    },
    /** **/
    actionExpenseTypeList() {
      const collectStore = useCollectRequestsStore()

      fetchExpenseTypeList().then(({ data }) => {
        this.expenseTypeList = data.results
      })
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionExpenseTypeList',
        fn: this.actionExpenseTypeList,
        params: null
      })
    },
    /** **/
    actionCompaniesList() {
      const collectStore = useCollectRequestsStore()

      fetchCompaniesList({ condition: 'A' }).then(({ data }) => {
        this.filialList = data.results

        // Добавляем запрос в коллекцию
        collectStore.actionAddRequests({
          id: 'actionCompaniesList',
          fn: this.actionCompaniesList,
          params: null
        })
      })
    }
	},
})
