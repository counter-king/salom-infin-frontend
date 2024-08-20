import axiosConfig from "@/services/axios.config"

const URLS = {
  trips: "trips"
}

export const fetchBusinessTripList = (params = {}) => {
  return axiosConfig.get(`${URLS.trips}/`, params)
}
export const fetchBusinessTripDetail = (id) => {
  return axiosConfig.get(`${URLS.trips}/${id}/`)
}
