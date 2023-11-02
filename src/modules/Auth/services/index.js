import axiosConfig from "../../../services/axios.config"

const URLS = {
  login: "login/",
  profile: "profile/"
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
