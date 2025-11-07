import axiosConfig from "@/services/axios.config"

// Attendance
export const fetchGetAttendanceList = (params) => {
  return axiosConfig.get("attendance/", params)
}

export const fetchGetAttendanceCountByStatus = (params) => {
  return axiosConfig.get("attendance/summary/", params)
}

// Work Schedules
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

// Employee Schedules
export const fetchAssignWorkScheduleList = (params) => {
  return axiosConfig.get("employee-schedules/", params)
}
export const fetchAssignWorkSchedule = (body) => {
  return axiosConfig.post("employee-schedules/bulk-assign/", body)
}

// Attendance Reasons
export const fetchGetAttendanceReasonsList = (params) => {
  return axiosConfig.get("attendance-reasons/", params)
}
export const fetchCreateAttendanceReason = (body) => {
  return axiosConfig.post("attendance-reasons/", body)
}
export const fetchUpdateAttendanceReason = ({ id, body }) => {
  return axiosConfig.put(`attendance-reasons/${id}/`, body)
}
export const fetchDeleteAttendanceReason = (id) => {
  return axiosConfig.delete(`attendance-reasons/${id}/`)
}

// Exception Employees
export const fetchGetExceptionEmployeesList = (params) => {
  return axiosConfig.get("exception-employees/", params)
}
export const fetchCreateExceptionEmployees = (body) => {
  return axiosConfig.post("exception-employees/", body)
}
export const fetchMakeExceptionEmployeesActive = (ids) => {
  return axiosConfig.patch("exception-employees/make-active/", ids)
}
export const fetchMakeExceptionEmployeesInactive = (ids) => {
  return axiosConfig.patch("exception-employees/make-inactive/", ids)
}
