import { defineStore } from 'pinia'
import { fetchGetAttendanceExceptionsList } from '../../MyActivities/services'

export const useEmployeeTimesheetStore = defineStore('employee-timesheet-store', {
    state: () => ({
      employeeTimesheetListLoading: false,
      employeeTimesheetList: [],
      employeeTimesheetListTotalCount: 0,
      headers: [  {
        header: "timesheet-date",
        field: "data",
        active: true,
      },
      {
        header: "employees-count",
        field: "count",
        active: true
      },
      {
        header: "hr-employee",
        field: "hr_employee",
        active: true
      },
      {
        header: "need-to-confirm",
        field: "need_to_confirm",
        active: true
      },
      {
        header: "actions",
        field: "actions",
        active: true,
        width: '160px'
      }
    ]
    }),
    actions: {
      async getEmployeeTimesheetList(params) {
        try {
          this.employeeTimesheetListLoading = true
          const { data } = await fetchGetAttendanceExceptionsList(params)
          this.employeeTimesheetList = data.results
          this.employeeTimesheetListTotalCount = data.count
          return data
        } catch (error) {
          console.log(error)
        } finally {
          this.employeeTimesheetListLoading = false
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
