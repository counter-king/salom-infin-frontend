import axiosConfig from "@/services/axios.config"

const URLS = {
  birthday: `user-birthdays`,
  birthdayReactionCounts: `birthday-reactions/counts`,
  birthdayReactions: `birthday-reactions`,
  moodReactionCounts: `mood-reactions/counts`,
  moodReactions: `mood-reactions`
}

export const fetchGetBirthdayList = (params) => {
  return axiosConfig.get(`${URLS.birthday}/`, params)
}
export const fetchGetBirthdayReactionCounts = (userId) => {
  return axiosConfig.get(`${URLS.birthdayReactionCounts}/${userId}/`)
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
