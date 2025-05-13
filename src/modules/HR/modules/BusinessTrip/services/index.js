import axiosConfig from "@/services/axios.config"

const URLS = {
  trips: "trips",
  tripVerification: "trip-verification",
  tripExpenses: "trip-expenses",
  countries: "countries",
  regions: "regions",
  tags: "tags"
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
  return axiosConfig.get(`${URLS.countries}/`, { page:1, page_size:20, ...params})
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
// create region
export const fetchCreateRegion = (body) => {
  return axiosConfig.post(`${URLS.regions}/`, body)
}
// get regions
export const fetchGetRegionList = (params = {}) => {
  return axiosConfig.get(`${URLS.regions}/`, { page:1, page_size:20, ...params})
}
// get region by id
export const fetchGetRegionById = (id) => {
  return axiosConfig.get(`${URLS.regions}/${id}/`)
}
// update region by id
export const fetchUpdateRegionById = (id, body) => {
  return axiosConfig.put(`${URLS.regions}/${id}/`, body)
}
// delete region by id
export const fetchDeleteRegionById = (id) => {
  return axiosConfig.delete(`${URLS.regions}/${id}/`)
}
// create tag
export const fetchCreateTag = (body) => {
  return axiosConfig.post(`${URLS.tags}/`, body)
}
// get tags
export const fetchGetTagList = (params = {}) => {
  return axiosConfig.get(`${URLS.tags}/`, { page:1, page_size:20, ...params})
}
// get tag by id
export const fetchGetTagById = (id) => {
  return axiosConfig.get(`${URLS.tags}/${id}/`)
}
// update tag by id
export const fetchUpdateTagById = (id, body) => {
  return axiosConfig.put(`${URLS.tags}/${id}/`, body)
}
// delete tag by id
export const fetchDeleteTagById = (id) => {
  return axiosConfig.delete(`${URLS.tags}/${id}/`)
}
