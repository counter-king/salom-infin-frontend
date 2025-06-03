import axiosConfig from "./axios.config"

const URLS = {
  users: "users",
  usersOnVacation: "users-on-vacation",
  userSearch: 'user-search',
  employeeGroups: "employee-groups",
  topSigners: "top-signers"
}
/**
 * Возвращает список пользователей
 * @returns Promise
 * */
export const fetchUsersList = (params) => {
  return axiosConfig.get(`${URLS.users}/`, params)
}
/**
 * Возвращает список пользователей
 * @returns Promise
 * */
export const fetchUserSearchList = (params) => {
  return axiosConfig.get(`${URLS.userSearch}/`, params)
}
/**
 * Возвращает список пользователей
 * @returns Promise
 * */
export const fetchUserOnVacationList = (params) => {
  return axiosConfig.get(`${URLS.usersOnVacation}/`, params)
}
/** **/
export const fetchTopSignersList = (params) => {
  return axiosConfig.get(`${URLS.topSigners}/`, params)
}
/** **/
export const fetchUserDetail = (id) => {
  return axiosConfig.get(`${URLS.users}/${id}/`)
}
/**
 * Возвращает список группа сотрудников
 * @returns Promise
 * */
export const fetchEmployeeGroupsList = (params) => {
  return axiosConfig.get(`${URLS.employeeGroups}/`, params)
}
/**
 * Создание группа сотрудников
 * @returns Promise
 * */
export const fetchEmployeeGroupsCreate = async (body) => {
  return await axiosConfig.post(`${URLS.employeeGroups}/`, body)
}
