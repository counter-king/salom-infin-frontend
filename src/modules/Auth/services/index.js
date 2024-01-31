import axiosConfig from "../../../services/axios.config"

const URLS = {
  login: 'login/',
  profile: 'profile/',
  otp: 'send-otp/',
  verify: 'verify-phone/',
  setPassword: 'set-password/'
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
