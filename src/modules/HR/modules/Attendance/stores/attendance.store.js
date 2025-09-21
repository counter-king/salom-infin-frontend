import { defineStore } from 'pinia'
// Services
import { fetchGetAttendanceList } from "@/modules/HR/modules/Attendance/services"
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
        count: 1864,
        title: "on-time-arrivals"
      },
      {
        id: 2,
        color: "bg-warning-500",
        icon: InfoCircleBoldIcon,
        count: 154,
        title: "late-arrivals"
      },
      {
        id: 3,
        color: "bg-critic-300",
        icon: CloseCircleBoldIcon,
        count: 24,
        title: "absentees"
      },
      {
        id: 4,
        color: "bg-info-300",
        icon: AlarmTurnOffBoldIcon,
        count: 38,
        title: "early-leavers"
      },
      {
        id: 5,
        color: "bg-critic-300",
        icon: CalendarSearchBoldIcon,
        count: 20,
        title: "not-registered-face-id"
      }
    ]
  }),
  actions: {
    async actionGetAttendanceList() {
      this.listLoading = true
      try {
        const res = await fetchGetAttendanceList()
        console.log(res)
        this.totalCount = res?.data?.count
        this.attendanceList = res?.data?.results
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.listLoading = false
      }
    },
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
