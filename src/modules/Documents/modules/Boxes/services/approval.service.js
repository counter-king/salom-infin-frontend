import axiosConfig from "@/services/axios.config"

const URLS = {
  approval: "approvers"
}
export const fetchApprovalList = (params = {}) => {
  return axiosConfig.get(`${URLS.approval}/`, params)
}
export const fetchApprovalDetail = (id) => {
  return axiosConfig.get(`${URLS.approval}/${id}/`)
}
export const fetchApproveDocument = (id) => {
  return axiosConfig.put(`${URLS.approval}/${id}/approve/`)
}
export const fetchRejectApprovalDocument = ({ id, comment }) => {
  return axiosConfig.put(`${URLS.approval}/${id}/reject/`, { comment })
}
