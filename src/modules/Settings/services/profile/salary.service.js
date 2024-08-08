import axiosConfig from '@/services/axios.config'

const URLS = {
  setPasscode: 'set-passcode',
  checkPasscode: 'check-passcode',
  userSalary: 'my-salary'
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
export const fetchUserSalary = (params) => {
  return axiosConfig.get(`${URLS.userSalary}/`, params)
}
