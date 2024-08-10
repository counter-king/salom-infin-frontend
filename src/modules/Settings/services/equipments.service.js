import axiosConfig from '@/services/axios.config'

const URLS = {
  equipment: 'my-equipment'
}
/**
 *
 * */
export const fetchEquipment = (params) => {
  return axiosConfig.get(`${URLS.equipment}/`, params)
}
