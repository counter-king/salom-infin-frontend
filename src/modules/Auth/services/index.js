import axiosConfig from "../../../services/axios.config"

const URLS = {
  login: 'login/',
  loginWithAd: 'ldap-login/',
  profile: 'profile/',
  otp: 'send-otp/',
  verify: 'verify-phone/',
  setPassword: 'set-password/',
  loginViaERI: 'eds-login/'
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
