import axiosConfig from "@/services/axios.config";

const URLS = {
  companies: "companies/",
  topDepartments: "departments/top-level-departments",
  documentTypes: "document-types/",
  documentSubTypes: "document-sub-types/",
  iabsAction: "iabs/actions/",
  iabsRequestCalls: "iabs/request-calls/",
  retryAction: "retry-action/",
  users: "users/"
}

// get companies list
export const getCompanyList = (params) => {
  return axiosConfig.get(URLS.companies, params)
}

// get top departments list
export const getTopDepartmentsList = (params) => {
  return axiosConfig.get(URLS.topDepartments, params)
}

// get document Type
export const getDocumentTypeList = (params) => {
   return axiosConfig.get(URLS.documentTypes, params)
}
// get document sub type
export const getDocumentSubTypeList = (params) => {
   return axiosConfig.get(URLS.documentSubTypes, params)
}

// get iabs action
export const getIabsActionList = (params) => {
   return axiosConfig.get(URLS.iabsAction, {...params })
}
// get iabs action by id
export const getIabsActionById = (id) => {
   return axiosConfig.get(`${URLS.iabsAction}${id}/`)
}
// get iabs request calls
export const getIabsRequestCalls = (params) => {
   return axiosConfig.get(URLS.iabsRequestCalls, params)
}
// retry iabs action
export const getRetryIabsAction = (id, body) => {
   return axiosConfig.post(`${URLS.iabsAction}${id}/${URLS.retryAction}`, body)
}
// get users list
export const fetchGetUsersList = (params) => {
   return axiosConfig.get(URLS.users, params)
}