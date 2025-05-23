import axiosConfig from "@/services/axios.config";

const URLS = {
  companies: "companies/",
  topDepartments: "departments/top-level-departments",
  documentTypes: "document-types/",
  documentSubTypes: "document-sub-types/",
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
