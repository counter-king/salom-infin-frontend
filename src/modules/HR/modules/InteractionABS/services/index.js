import axiosConfig from "@/services/axios.config";

const URLS = {
  companies: "companies/",
  topDepartments: "departments/top-level-departments",
  documentTypes: "document-types/",
  documentSubTypes: "document-sub-types/",
  iabsAction: "iabs/actions/"
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