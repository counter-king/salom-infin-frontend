import axiosConfig from "./axios.config"

const URLS = {
  deliveryTypes: "delivery-types/",
  topDepartments: "departments/top-level-departments",
  districts: "districts/",
  documentTypes: "document-types/",
  employeeGroups: "employee-groups/",
  journals: "journals/",
  languages: "languages/",
  priorities: "priorities/",
  regions: "regions/",
  shortDescription: "short-descriptions/",
  status: "status/",
  composeStatus: "compose/1/statuses/",
	users: "users",
  departments: "departments",
  documentTitles: 'document-titles/'
}
/**
 * Возвращает список вид подачи
 * @returns [{Array}]
 * */
export const fetchDeliveryTypesList = () => {
  return axiosConfig.get(URLS.deliveryTypes)
}
/**
 * Возвращает список департаментов
 * @returns [{Array}]
 * */
export const fetchDepartmentList = () => {
  return axiosConfig.get(`${URLS.topDepartments}/`, { page_size: 50 })
}
/**
 * Возвращает список районов
 * @returns [{Array}]
 * */
export const fetchDistrictList = () => {
  return axiosConfig.get(URLS.districts)
}
/**
 * Возвращает список тип документов
 * @returns [{Array}]
 * */
export const fetchDocumentTypesList = () => {
  return axiosConfig.get(URLS.documentTypes)
}
/**
 * Возвращает список журналов
 * @returns [{Array}]
 * */
export const fetchJournalsList = () => {
  return axiosConfig.get(URLS.journals)
}
/**
 * Возвращает список языков
 * @returns [{Array}]
 * */
 export const fetchLanguagesList = () => {
  return axiosConfig.get(URLS.languages)
}
/**
 * Возвращает список приоритетов
 * @returns [{Array}]
 */
export const fetchPrioryList = () => {
  return axiosConfig.get(URLS.priorities)
}
/**
 * Возвращает список регионов
 * @returns [{Array}]
 */
export const fetchRegionsList = () => {
  return axiosConfig.get(URLS.regions)
}
/**
 * Возвращает список кратких описаний
 * @returns [{Array}]
 * */
export const fetchShortDescriptionList = () => {
  return axiosConfig.get(URLS.shortDescription)
}
/**
 * Возвращает список статусов
 * @returns [{Array}]
 */
export const fetchStatusList = () => {
  return axiosConfig.get(URLS.status)
}
/**
 * Возвращает список compose статусов
 * @returns [{Array}]
 */
export const fetchComposeStatusList = () => {
  return axiosConfig.get(URLS.composeStatus)
}
export const fetchUserDetail = (id) => {
  return axiosConfig.get(`${URLS.users}/${id}/`)
}
export const fetchDepartmentDetail = (id) => {
  return axiosConfig.get(`${URLS.departments}/${id}/`)
}
/**
 * Возвращает список наименование
 * @returns [{Array}]
 */
export const fetchDocumentTitlesList = () => {
  return axiosConfig.get(URLS.documentTitles)
}

