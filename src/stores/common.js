import { defineStore } from "pinia"
import {
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
} from "@/services/common.service"
import { useCorrespondentStore } from "./correspondent"
import { useUsersStore } from "./users.store"
import { CORRESPONDENT } from "@/enums"

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
	}),
	getters: {
		getStatusList: (state) => state.statusList
	},
	actions: {
		init() {
      const correspondent = useCorrespondentStore()
      const users = useUsersStore()

      correspondent.actionGetList({ type: CORRESPONDENT.ALL })
      users.actionUsersList()
      users.actionEmployeeGroupList()
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
		},
    /**
     * Возвращает список вид подачи
     * @returns Array
     * */
    actionDeliveryTypesList() {
      fetchDeliveryTypesList().then(({ data }) => {
        this.deliveryTypeList = data.results
      })
    },
    /**
     * Возвращает список департаментов
     * @returns Array
     * */
    actionDepartmentList() {
      fetchDepartmentList().then(({ data }) => {
        this.departmentList = data.results
      })
    },
    /**
     * Возвращает список районов
     * @returns Array
     * */
    actionDistrictList() {
      fetchDistrictList().then(({ data }) => {
        this.districtList = data.results
      })
    },
    /**
     * Возвращает список тип документов
     * @returns Array
     * */
    actionDocumentTypesList() {
      fetchDocumentTypesList().then(({ data }) => {
        this.documentTypesList = data.results
      })
    },
    /**
     * Возвращает список журналов
     * @returns Array
     * */
    actionJournalsList() {
      fetchJournalsList().then(({ data }) => {
        this.journalsList = data.results
      })
    },
    /**
     * Возвращает список журналов
     * @returns Array
     * */
     actionLanguagesList() {
      fetchLanguagesList().then(({ data }) => {
        this.languagesList = data.results
      })
    },
    /**
     * Возвращает список приоритетов
     * @returns Array
     */
    actionPrioryList() {
      fetchPrioryList().then(({ data }) => {
        this.prioryList = data.results
      })
    },
    /**
     * Возвращает список регионов
     * @returns Array
     */
    actionRegionsList() {
      fetchRegionsList().then(({ data }) => {
        this.regionsList = data.results
      })
    },
    /**
     * Возвращает список кратких описаний
     * @returns Array
     * */
    actionShortDescriptionList() {
      fetchShortDescriptionList().then(({ data }) => {
        this.shortDescriptionList = data.results
      })
    },
    /**
     * Возвращает список статусов
     * @returns Array
     * */
    actionStatusList() {
      fetchStatusList().then(({ data }) => {
        this.statusList = data.results
      })
		},
	},
})
