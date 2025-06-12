import axiosConfig from '@/services/axios.config'

const URLS = {
  payrolls: 'payrolls/summary',
  comparison: 'payrolls/comparison',
  byCompanyType: 'payrolls/by-company-type',
  tripByStatus: 'trips-statistics/by-status',
  tripInnerOuterChart: 'trips-statistics/by-type-line-chart',
  tripTopDepartments: 'trips-statistics/by-top-departments',
  byRoute: 'trips-statistics/by-route',
  byGoals: 'trips-statistics/by-goals',
  byLocations: 'trips-statistics/by-locations',
  byExpense: 'trips-statistics/by-expense',
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
/**
 * @returns Promise
 * */
export const fetchDashboardByCompanyType = (params = {}) => {
  return axiosConfig.get(`${URLS.byCompanyType}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchTripByStatus = (params = {}) => {
  return axiosConfig.get(`${URLS.tripByStatus}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchTripInnerOuterChart = (params = {}) => {
  return axiosConfig.get(`${URLS.tripInnerOuterChart}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchTripTopDepartments = (params = {}) => {
  return axiosConfig.get(`${URLS.tripTopDepartments}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchByRoute = (params = {}) => {
  return axiosConfig.get(`${URLS.byRoute}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchByGoals = (params = {}) => {
  return axiosConfig.get(`${URLS.byGoals}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchByLocations = (params = {}) => {
  return axiosConfig.get(`${URLS.byLocations}/`, params)
}
/**
 * @returns Promise
 * */
export const fetchByExpense = (params = {}) => {
  return axiosConfig.get(`${URLS.byExpense}/`, params)
}
