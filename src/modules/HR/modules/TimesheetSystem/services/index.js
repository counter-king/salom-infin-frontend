import axiosConfig from "@/services/axios.config"

export const fetchGetTableListByMonth = (params) => {
  return axiosConfig.get(`payroll/periods/`, params)
}
export const fetchGetTimesheetDetail = (id) => {
  return axiosConfig.get(`payroll/periods/${id}/`)
}
