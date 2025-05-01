import axiosConfig from '@/services/axios.config'

const URLS = {
  payrolls: 'payrolls/summary'
}
/**
 * @returns Promise
 * */
export const fetchDashboardPayrolls = (params = {}) => {
  return axiosConfig.get(`${URLS.payrolls}/`, params)
}
