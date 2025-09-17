import axiosConfig from "@/services/axios.config"

export const fetchGetAttendanceList = () => {
  return axiosConfig.get("attendance/")
}
