import axiosConfig from "@/services/axios.config"

export const fetchGetAttendanceList = (params) => {
  return axiosConfig.get("attendance/", params)
}
export const fetchGetAttendanceCountByStatus = (params) => {
  return axiosConfig.get("attendance/summary/", params)
}
export const fetchGetWorkScheduleList  = (params) => {
  return axiosConfig.get("work-schedules/", params)
}
export const fetchCreateWorkSchedule = (body) => {
  return axiosConfig.post("work-schedules/", body)
}
export const fetchUpdateWorkSchedule = ({ id, body }) => {
  return axiosConfig.put(`work-schedules/${id}/`, body)
}
export const fetchDeleteWorkSchedule = (id) => {
  return axiosConfig.delete(`work-schedules/${id}/`)
}
