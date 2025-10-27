import axiosConfig from "@/services/axios.config"

const URLS = {
  birthday: `user-birthdays`,
  birthdayReactionCounts: `birthday-reactions/counts`,
  birthdayCongratulations: `birthday-congratulations`,
  birthdayReactionComments: `birthday-reactions/comments`,
  birthdayComments: `birthday-comments`,
  birthdayReactions: `birthday-reactions`,
  moodReactionCounts: `mood-reactions/counts`,
  moodReactions: `mood-reactions`,
  dashboardContacts: `dashboard/users`,
  dashboardFavouriteContacts: `my-selected-contacts`,
}

export const fetchGetBirthdayList = (params) => {
  return axiosConfig.get(`${URLS.birthday}/`, params)
}
export const fetchGetBirthdayReactionCounts = (userId) => {
  return axiosConfig.get(`${URLS.birthdayReactionCounts}/${userId}/`)
}
export const fetchGetBirthdayCongratulations = () => {
  return axiosConfig.get(`${URLS.birthdayCongratulations}/`)
}
export const fetchSendBirthdayComment = (body) => {
  return axiosConfig.post(`${URLS.birthdayComments}/`, body)
}
export const fetchUpdateBirthdayComment = ({ id, body }) => {
  return axiosConfig.put(`${URLS.birthdayComments}/${id}/`, body)
}
export const fetchGetBirthdayReactionComments = (userId) => {
  return axiosConfig.get(`${URLS.birthdayComments}/${userId}/comments/`)
}
export const fetchCongratulateUser = (body) => {
  return axiosConfig.post(`${URLS.birthdayReactions}/`, body)
}
export const fetchGetMoodReactionCounts = (params) => {
  return axiosConfig.get(`${URLS.moodReactionCounts}/`, params)
}
export const fetchSelectMood = (body) => {
  return axiosConfig.post(`${URLS.moodReactions}/`, body)
}
export const fetchDashboardContacts = (params) => {
  return axiosConfig.get(`${URLS.dashboardContacts}/`, params)
}
export const fetchDashboardFavouriteContacts = (params) => {
  return axiosConfig.get(`${URLS.dashboardFavouriteContacts}/`, params)
}
export const fetchAddContactToFavourites = (body) => {
  return axiosConfig.post(`${URLS.dashboardFavouriteContacts}/`, body)
}
export const fetchDeleteContactFromFavourites = (id) => {
  return axiosConfig.delete(`${URLS.dashboardFavouriteContacts}/${id}/`)
}
export const fetchDashboardAttendanceList = (params) => {
  return axiosConfig.get(`${URLS.dashboardAttendance}/`, params)
}
export const fetchUpdateDashboardAttendance = (id, body) => {
  return axiosConfig.patch(`${URLS.dashboardAttendance}/${id}/has-reason/`, body)
}

