import axiosConfig from '@/services/axios.config'

const URLS = {
  payrolls: 'payrolls/summary',
  comparison: 'payrolls/comparison',
}
/**
 * @returns Promise
 * */
export const fetchDashboardPayrolls = (params = {}) => {
  return axiosConfig.get(`${URLS.payrolls}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchDashboardComparison = (params = {}) => {
  return axiosConfig.get(`${URLS.comparison}/`, params)
}
