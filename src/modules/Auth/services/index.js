import axiosConfig from "../../../services/axios.config"

const URLS = {
  login: 'login/',
  loginWithAd: 'ldap-login/',
  profile: 'profile/',
  otp: 'send-otp/',
  verify: 'verify-phone/',
  setPassword: 'set-password/',
  loginViaERI: 'eds-login/',
  customAvatars: 'custom-avatars'
}
/**
*
* */
export const fetchUserLogin = (body) => {
  return axiosConfig.post(URLS.login, body)
}
/**
*
* */
export const fetchLoginWithAd = (body) => {
  return axiosConfig.post(URLS.loginWithAd, body)
}
/** **/
export const fetchLoginViaERI = (body) => {
  return axiosConfig.post(URLS.loginViaERI, body)
}
/**
*
* */
export const fetchCurrentUser = () => {
  return axiosConfig.get(URLS.profile)
}
/**
 *
 * */
export const fetchCurrentUserUpdate = (body) => {
  return axiosConfig.put(URLS.profile, body)
}
/**
 *
 * */
export const fetchUpdateUserAvatar = (body) => {
  return axiosConfig.post(`${URLS.customAvatars}/`, body)
}
/**
 *
 * */
export const fetchDeleteUserAvatar = (id) => {
  return axiosConfig.delete(`${URLS.customAvatars}/${id}/`)
}
/*
*
* */
export const fetchSendOtp = async (body) => {
  return axiosConfig.post(URLS.otp, body)
}
/*
*
* */
export const fetchVerifyNumber = async (body) => {
  return axiosConfig.post(URLS.verify, body)
}
/*
*
* */
export const fetchSetPassword = async (body) => {
  return axiosConfig.put(URLS.setPassword, body)
}
