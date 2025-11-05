import { defineStore } from 'pinia'
import { fetchGetAttendanceExceptionsList } from '../../MyActivities/services'

export const useAttendanceWithReasonStore = defineStore('attendance-with-reason-store', {
    state: () => ({
      attendanceWithReasonListLoading: false,
      attendanceWithReasonList: [],
      attendanceWithReasonListTotalCount: 0,
      headers: [  {
        header: "employee",
        field: "employee",
        active: true,
      },
      {
        header: "position",
        field: "position",
        active: true
      },
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "arrival-time",
        field: "arrival_time",
        active: true
      },
      {
        header: "departure-time",
        field: "departure_time",
        active: true
      },
      {
        header: "status",
        field: "status",
        active: true
      },
      // {
      //   header: "status",
      //   field: "reason_status",
      //   active: true
      // },
      {
        header: "application-status",
        field: "application_status",
        active: true,
        width: '160px'
      }
    ]
    }),
    actions: {
      async getAttendanceExceptionsWithReasonList(params) {
        try {
          this.attendanceWithReasonListLoading = true
          const { data } = await fetchGetAttendanceExceptionsList(params)
          this.attendanceWithReasonList = data.results
          this.attendanceWithReasonListTotalCount = data.count
          return data
        } catch (error) {
          console.log(error)
        } finally {
          this.attendanceWithReasonListLoading = false
        }
      },
      resetHeaders() {
        this.headers = this.headers.map(header => ({
          ...header,
          active: true
        }))
      }
    }
})
