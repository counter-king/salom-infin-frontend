import axiosConfig from "./axios.config"

const URLS = {
  deliveryTypes: "delivery-types/",
  topDepartments: "departments/top-level-departments",
  districts: "districts/",
  documentTypes: "document-types/",
  documentSubTypes: "document-sub-types/",
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
  documentTitles: 'document-titles/',
  companies: 'companies',
  departmentsWithUser: 'departments-with-users',
  userSearch: 'user-search',
  expenseTypes: 'expense-types',
  tags: 'tags',
  ratePage: "rate-page"
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
export const fetchDepartmentList = (params) => {
  return axiosConfig.get(`${URLS.topDepartments}/`, { page_size: 50, condition:'A,K',...params })
}
/**
 * Возвращает список сотрудников департаментов
 * @returns [{Array}]
 * */
export const fetchDepartmentsUserListBySearch = (params) => {
  return axiosConfig.get(`${URLS.userSearch}/`, { page_size: 200, ...params })
}
/**
 * Возвращает список департаментов
 * @returns [{Array}]
 * */
export const fetchDepartmentsWithUserList = ({ id, params }) => {
  return axiosConfig.get(`${URLS.departmentsWithUser}/${id}/`, { page_size: 200, ...params })
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
/** **/
export const fetchDocumentTypesDetail = (id) => {
  return axiosConfig.get(`${URLS.documentTypes}${id}/`)
}
/**
 * Возвращает список суб тип документов
 * @returns [{Array}]
 * */
export const fetchDocumentSubTypesList = () => {
  return axiosConfig.get(URLS.documentSubTypes)
}
/** **/
export const fetchDocumentSubTypesDetail = (id) => {
  return axiosConfig.get(`${URLS.documentSubTypes}${id}/`)
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
  return axiosConfig.get(URLS.regions, {
    page_size: 50
  })
}
/**
 * Возвращает список кратких описаний
 * @returns [{Array}]
 * */
export const fetchShortDescriptionList = (params = {}) => {
  return axiosConfig.get(URLS.shortDescription, params = { page_size: 50, ...params })
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
export const fetchComposeStatusDetail = (id) => {
  return axiosConfig.get(`${URLS.composeStatus}${id}/`)
}
export const fetchCompaniesList = (params) => {
  return axiosConfig.get(`${URLS.companies}/`, params)
}
export const fetchCompanyDetail = (id) => {
  return axiosConfig.get(`${URLS.companies}/${id}/`)
}
export const fetchExpenseTypeList = (params) => {
  return axiosConfig.get(`${URLS.expenseTypes}/`, params)
}
export const fetchTagList = (params) => {
  return axiosConfig.get(`${URLS.tags}/`, params)
}

// create rate page
export const fetchCreateRatePage = (body) => {
  return axiosConfig.post(`${URLS.ratePage}/`, body)
}
