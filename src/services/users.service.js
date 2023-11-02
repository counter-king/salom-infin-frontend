import axiosConfig from "./axios.config"

const URLS = {
  users: "users",
  employeeGroups: "employee-groups"
}
/**
 * Возвращает список пользователей
 * @returns Promise
 * */
export const fetchUsersList = (params) => {
  return axiosConfig.get(`${URLS.users}/`, params)
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
