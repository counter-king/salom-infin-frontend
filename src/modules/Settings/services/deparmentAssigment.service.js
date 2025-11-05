import axiosConfig from "@/services/axios.config"

export const fetchGetAssignedEmpList = (params) => {
  return axiosConfig.get(`hr/assigned-users/`, params)
}
export const fetchDeleteAssignedEmp = (id) => {
  return axiosConfig.delete(`hr/assigned-users/${id}/clear-scopes/`)
}
export const fetchCreateAssignedEmpDepartment = (body) => {
  return axiosConfig.post(`hr/department-scopes/bulk-assign/`, body)
}
export const fetchCreateAssignedEmpBranch = (body) => {
  return axiosConfig.post(`hr/branch-scopes/bulk-assign/`, body)
}
export const fetchGetAssignedDepList = (params) => {
  return axiosConfig.get(`hr/department-scopes/`, params)
}
export const fetchGetAssignedBranchList = (params) => {
  return axiosConfig.get(`hr/branch-scopes/`, params)
}
export const fetchDeleteAssignedEmpDepartment = (id) => {
  return axiosConfig.delete(`hr/department-scopes/${id}/`)
}
export const fetchDeleteAssignedEmpBranch = (id) => {
  return axiosConfig.delete(`hr/branch-scopes/${id}/`)
}
