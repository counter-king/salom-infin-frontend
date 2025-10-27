import axiosConfig from "@/services/axios.config"

const URLS = {
    myAttendance: "my-attendance",
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