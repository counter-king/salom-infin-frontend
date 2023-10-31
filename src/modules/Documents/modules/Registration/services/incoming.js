import axiosConfig from "@/services/axios.config"

const URLS = {
  incomingList: "docflow/"
}

/**
 *
 * */
export const fetchRegistrationIncomingList = (params) => {
  return axiosConfig.get(`${URLS.incomingList}1/`, params)
}
/**
 *
 * */
