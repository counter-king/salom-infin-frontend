import axiosConfig from "@/services/axios.config"

const URLS = {
  compose: `compose/1`,
}
export const fetchGetDocumentList = (params) => {
  return axiosConfig.get(`${URLS.compose}/`, params)
}
export const fetchCreateDocument = (body) => {
  return axiosConfig.post(`${URLS.compose}/`, body)
}
export const fetchUpdateDocument = ({ id, body }) => {
  return axiosConfig.put(`${URLS.compose}/${id}/`, body)
}
export const fetchGetDocumentDetail = (id) => {
  return axiosConfig.get(`${URLS.compose}/${id}/`)
}
export const fetchCustomUpdate = ({ id, body }) => {
  return axiosConfig.put(`${URLS.compose}/${id}/custom-update/`, body)
}
export const fetchVersionHistory = (id) => {
  return axiosConfig.get(`${URLS.compose}/${id}/version-history/`)
}
