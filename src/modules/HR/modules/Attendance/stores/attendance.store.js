import { defineStore } from 'pinia'
// Services
import { fetchGetAttendanceCountByStatus, fetchGetAttendanceList } from "@/modules/HR/modules/Attendance/services"
// Components
import {
  AlarmTurnOffBoldIcon,
  CalendarSearchBoldIcon,
  CheckCircleBoldIcon,
  CloseCircleBoldIcon,
  InfoCircleBoldIcon, SettingsMinimalisticBoldIcon
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
        header: "user-status",
        field: "user_status",
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
        color: "bg-primary-400",
        icon: SettingsMinimalisticBoldIcon,
        count: null,
        title: "total",
        value: "all",
        active: true
      },
      {
        id: 2,
        color: "bg-success-600",
        icon: CheckCircleBoldIcon,
        count: null,
        title: "on-time-arrivals",
        value: "on_time",
        active: false
      },
      {
        id: 3,
        color: "bg-warning-500",
        icon: InfoCircleBoldIcon,
        count: null,
        title: "late-arrivals",
        value: "lateness",
        active: false
      },
      {
        id: 4,
        color: "bg-critic-300",
        icon: CloseCircleBoldIcon,
        count: null,
        title: "absentees",
        value: "absent",
        active: false
      },
      {
        id: 5,
        color: "bg-info-300",
        icon: AlarmTurnOffBoldIcon,
        count: null,
        title: "early-leavers",
        value: "early_leaves",
        active: false
      },
      {
        id: 6,
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
          count: item.value === 'all' ? res.data[0].absent + res.data[0].early_leaves + res.data[0].lateness + res.data[0].on_time : res.data[0][item.value] ?? 0
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
          header: "user-status",
          field: "user_status",
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
