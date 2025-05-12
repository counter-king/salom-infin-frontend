import axiosConfig from "@/services/axios.config"

const URLS = {
  trips: "trips",
  tripVerification: "trip-verification",
  tripExpenses: "trip-expenses",
  countries: "countries"
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
export const fetchAdvanceReportCreate = (body) => {
  return axiosConfig.post(`${URLS.tripExpenses}/`, body)
}

// create country
export const fetchCreateCountry = (body) => {
  return axiosConfig.post(`${URLS.countries}/`, body)
}
//  get countries
export const fetchGetCountryList = (params = {}) => {
  return axiosConfig.get(`${URLS.countries}/`, params)
}
// get country by id
export const fetchGetCountryById = (id) => {
  return axiosConfig.get(`${URLS.countries}/${id}/`)
}

// update country
export const fetchUpdateCountryById = (id, body) => {
  return axiosConfig.put(`${URLS.countries}/${id}/`, body)
}
// delete country by Id
export const fetchDeleteCountryById = (id) => {
  return axiosConfig.delete(`${URLS.countries}/${id}/`)
}
