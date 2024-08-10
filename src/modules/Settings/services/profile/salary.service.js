import axiosConfig from '@/services/axios.config'

const URLS = {
  setPasscode: 'set-passcode',
  checkPasscode: 'check-passcode',
  salary: 'my-salary',
  salaryStatistic: 'my-salary-statistics'
}
/**
 *
 * */
export const fetchSetPasscode = (body) => {
  return axiosConfig.patch(`${URLS.setPasscode}/`, body)
}
/**
 *
 * */
export const fetchCheckPasscode = (body) => {
  return axiosConfig.post(`${URLS.checkPasscode}/`, body)
}
/**
 *
 * */
export const fetchSalary = (params) => {
  return axiosConfig.get(`${URLS.salary}/`, params)
}
/**
 *
 * */
export const fetchSalaryStatistic = (params) => {
  return axiosConfig.get(`${URLS.salaryStatistic}/`, params)
}
