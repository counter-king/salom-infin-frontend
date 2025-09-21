import axiosConfig from "@/services/axios.config"

export const fetchGetAttendanceList = (params) => {
  return axiosConfig.get("attendance/", params)
}
export const fetchGetAttendanceCountByStatus = (params) => {
  return axiosConfig.get("attendance/summary/", params)
}
