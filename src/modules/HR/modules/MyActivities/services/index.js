import axiosConfig from "@/services/axios.config"

const URLS = {
    myAttendance: "my-attendance",
    attendanceExceptions: "attendance-exceptions",
}

export const fetchGetMyAttendanceList = (params) => {
    return axiosConfig.get(`${URLS.myAttendance}/`, { page:1, page_size: 31, ...params })
}

export const fetchGetMyAttendanceSummary = (params) => {
    return axiosConfig.get(`${URLS.myAttendance}/summary/`, {page:1, page_size: 31, ...params})
}

export const fetchGetMyAttendanceById = (id) => {
    return axiosConfig.get(`${URLS.myAttendance}/${id}/`)
}

export const fetchUpdateMyAttendanceByIdHasReason = (id, body) => {
    return axiosConfig.patch(`${URLS.myAttendance}/${id}/has-reason/`, body)
}

// create attendance exception
export const fetchCreateAttendanceExceptions = (body) => {
    return axiosConfig.post(`${URLS.attendanceExceptions}/`, body)
}

export const fetchGetAttendanceExceptionsList = (params) => {
    return axiosConfig.get(`${URLS.attendanceExceptions}/`, {page:1, page_size: 30, ...params})
}