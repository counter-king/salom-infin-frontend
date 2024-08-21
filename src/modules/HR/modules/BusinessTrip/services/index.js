import axiosConfig from "@/services/axios.config"

const URLS = {
  trips: "trips",
  tripVerification: "trip-verification"
}

export const fetchBusinessTripList = (params = {}) => {
  return axiosConfig.get(`${URLS.trips}/`, params)
}
export const fetchBusinessTripDetail = (id) => {
  return axiosConfig.get(`${URLS.trips}/${id}/`)
}
export const fetchMarkBusinessTripLeft = (id) => {
  return axiosConfig.put(`${URLS.tripVerification}/${id}/mark-left/`)
}
export const fetchMarkBusinessTripArrived = (id) => {
  return axiosConfig.put(`${URLS.tripVerification}/${id}/mark-arrived/`)
}
