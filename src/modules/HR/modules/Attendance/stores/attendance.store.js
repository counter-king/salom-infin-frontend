import { defineStore } from 'pinia'
// Services
import { fetchGetAttendanceCountByStatus, fetchGetAttendanceList } from "@/modules/HR/modules/Attendance/services"
// Components
import {
  AlarmTurnOffBoldIcon,
  CalendarSearchBoldIcon,
  CheckCircleBoldIcon,
  CloseCircleBoldIcon,
  InfoCircleBoldIcon
} from "@/components/Icons"

export const useHRAttendanceStore = defineStore("attendance-store", {
  state:() => ({
    listLoading: false,
    totalCount: 0,
    attendanceList: [],
    countsLoading: false,
    headers: [
      {
        header: "employee",
        field: "employee",
        active: true
      },
      {
        header: "position",
        field: "position",
        active: true
      },
      // {
      //   header: "branch",
      //   field: "company",
      //   active: true
      // },
      {
        header: "department",
        field: "department",
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
      // {
      //   header: "delay-duration",
      //   field: "delay_duration",
      //   active: true
      // },
      {
        header: "status",
        field: "status",
        active: true
      }
    ],
    statusItems: [
      {
        id: 1,
        color: "bg-success-600",
        icon: CheckCircleBoldIcon,
        count: null,
        title: "on-time-arrivals",
        value: "on_time"
      },
      {
        id: 2,
        color: "bg-warning-500",
        icon: InfoCircleBoldIcon,
        count: null,
        title: "late-arrivals",
        value: "lateness"
      },
      {
        id: 3,
        color: "bg-critic-300",
        icon: CloseCircleBoldIcon,
        count: null,
        title: "absentees",
        value: "absent"
      },
      {
        id: 4,
        color: "bg-info-300",
        icon: AlarmTurnOffBoldIcon,
        count: null,
        title: "early-leavers",
        value: "early_leaves"
      },
      {
        id: 5,
        color: "bg-critic-300",
        icon: CalendarSearchBoldIcon,
        count: null,
        title: "not-registered-face-id",
        value: "not_registered_on_faceid"
      }
    ]
  }),
  actions: {
    async actionGetAttendanceList(params) {
      this.listLoading = true
      try {
        const res = await fetchGetAttendanceList(params)
        this.totalCount = res?.data?.count
        this.attendanceList = res?.data?.results
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.listLoading = false
      }
    },
    /** **/
    async actionGetAttendanceCountByStatus(params = {}) {
      this.countsLoading = true
      try {
        const res = await fetchGetAttendanceCountByStatus(params)
        this.statusItems = this.statusItems.map(item => ({
          ...item,
          count: res.data[0][item.value] ?? 0
        }))
      }catch(error) {
        return Promise.reject(error)
      }finally {
        this.countsLoading = false
      }
    },
    /** **/
    resetHeaders() {
      this.headers = [
        {
          header: "employee",
          field: "employee",
          active: true
        },
        {
          header: "position",
          field: "position",
          active: true
        },
        // {
        //   header: "branch",
        //   field: "company",
        //   active: true
        // },
        {
          header: "department",
          field: "department",
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
        // {
        //   header: "delay-duration",
        //   field: "delay_duration",
        //   active: true
        // },
        {
          header: "status",
          field: "status",
          active: true
        }
      ]
    }
  }
})
