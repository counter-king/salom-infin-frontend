import axiosConfig from "@/services/axios.config"

export const fetchGetTableListByMonth = (params) => {
  return axiosConfig.get(`payroll/periods/overview/`, params)
}
