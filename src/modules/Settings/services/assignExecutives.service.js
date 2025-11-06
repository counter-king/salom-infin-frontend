import axiosConfig from "@/services/axios.config"

export const fetchAssignExecutivesDepartmentList = (params) => {
  return axiosConfig.get("managers/department/", params)
}
export const fetchCreateAssignExecutivesDepartment = (body) => {
  return axiosConfig.post("managers/department/sync/", body)
}
export const fetchAssignExecutivesBranchList = (params) => {
  return axiosConfig.get("managers/branch/", params)
}
export const fetchCreateAssignExecutivesBranch = (body) => {
  return axiosConfig.post("managers/branch/sync/", body)
}
