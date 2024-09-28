import axiosConfig from '@/services/axios.config'

let URLS = {
  users: 'users',
  setPermissions: 'set-permissions'
}

export const fetchUserOne = (id) => {
  return axiosConfig.get(`${URLS.users}/${id}/`)
}
/**
 *
 * */
export const fetchUserSetPermissions = (id, body) => {
  return axiosConfig.put(`${URLS.users}/${id}/${URLS.setPermissions}/`, body)
}
