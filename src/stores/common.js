// Core
import { defineStore } from 'pinia'
// Stores
import { useCorrespondentStore } from './correspondent'
import { useUsersStore } from './users.store'
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
import { useDocumentCountStore } from '@/modules/Documents/stores/count.store'
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
  fetchDocumentTitlesList
} from '@/services/common.service'
// Enums
import { CORRESPONDENT } from '@/enums'

export const useCommonStore = defineStore("common", {
	state: () => ({
    deliveryTypeList: [],
    departmentList: [],
    districtList: [],
    documentTypesList: [],
    journalsList: [],
    languagesList: [],
    prioryList: [],
    regionsList: [],
    shortDescriptionList: [],
    statusList: [],
    composeStatusList: [],
    documentTitleList: []
	}),
	getters: {
		getStatusList: (state) => state.statusList,
    /*
    *
    * */
    getJournalById: (state) => (id) => state.journalsList.find(journal => journal.id === id)
	},
	actions: {
		async init() {
      const correspondent = useCorrespondentStore()
      const users = useUsersStore()
      const documentCount = useDocumentCountStore()

      await documentCount.actionDocumentCountList()
      await correspondent.actionGetList({ type: CORRESPONDENT.ALL })
      await users.actionUsersList()
      await users.actionEmployeeGroupList()
      this.actionDeliveryTypesList()
      this.actionDepartmentList()
      this.actionDistrictList()
      this.actionDocumentTypesList()
      this.actionJournalsList()
      this.actionLanguagesList()
      this.actionPrioryList()
      this.actionRegionsList()
      this.actionShortDescriptionList()
      this.actionStatusList()
      this.actionComposeStatusList()
      this.actionDocumentTitlesList()
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
    /**
     * Возвращает список журналов
     * @returns Array
     * */
    actionJournalsList() {
      const collectStore = useCollectRequestsStore()

      fetchJournalsList().then(({ data }) => {
        this.journalsList = data.results
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
    actionShortDescriptionList() {
      const collectStore = useCollectRequestsStore()

      fetchShortDescriptionList().then(({ data }) => {
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
	},
})
