import axiosConfig from '@/services/axios.config'

/**
 *
 * */
export const fetchUserSetPermissions = (id, body) => {
  return axiosConfig.put(`users/${id}/set-permissions/`, body)
}
