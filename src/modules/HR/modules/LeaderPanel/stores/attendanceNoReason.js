import { defineStore } from 'pinia'
import { fetchGetAttendanceExceptionsList } from '../../MyActivities/services'

export const useAttendanceNoReasonStore = defineStore('attendance-no-reason-store', {
    state: () => ({
      attendanceNoReasonListLoading: false,
      attendanceNoReasonList: [],
      attendanceNoReasonListTotalCount: 0,
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
      {
        header: "actions",
        field: "actions",
        active: true,
        width: '220px'
      }
    ]
    }),
    actions: {
      async getAttendanceExceptionsNoReasonList(params) {
        try {
          this.attendanceNoReasonListLoading = true
          const { data } = await fetchGetAttendanceExceptionsList(params)
          this.attendanceNoReasonList = data.results
          this.attendanceNoReasonListTotalCount = data.count
          return data
        } catch (error) {
          console.log(error)
        } finally {
          this.attendanceNoReasonListLoading = false
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
