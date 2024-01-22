import axiosConfig from "@/services/axios.config"

const URLS = {
  sign: "signers"
}
export const fetchSignList = (params = {}) => {
  return axiosConfig.get(`${URLS.sign}/`, params)
}
export const fetchSignDetail = (id) => {
  return axiosConfig.get(`${URLS.sign}/${id}/`)
}
export const fetchRejectSignDocument = ({ id, comment }) => {
  return axiosConfig.put(`${URLS.sign}/${id}/reject/`, { comment })
}
export const fetchSignDocument = ({ id, body }) => {
  return axiosConfig.put(`${URLS.sign}/${id}/sign/`, body)
}
