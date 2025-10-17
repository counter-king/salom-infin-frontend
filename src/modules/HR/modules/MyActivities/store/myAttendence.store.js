// Core
import { defineStore } from 'pinia'

export const useMyAttendanceStore = defineStore("my-attendance-store", {
  state: () => ({
    myAttendanceListMap: new Map(),
    myAttendanceTotalCount: 0,
    myAttendanceListLoading: false,
    headers: [
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "days-of-the-week",
        field: "week_days",
        active: true
      },
      {
        header: "sattus",
        field: "status",
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
        header: "worked-time",
        field: "worked_time",
        active: true
      },
      {
        header: "status",
        field: "status2",
        active: true
      }
    ]
  }),
  actions: {
    /** **/
    async getMyAttendanceList(params) {
        const data =  [
        { day: '01-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '02-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '03-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '04-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '05-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '06-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '07-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '08-10-2025', type: "LABOR_LEAVE", hours: 0 },
        { day: '09-10-2025', type: "LABOR_LEAVE", hours: 8 },
        { day: '10-10-2025', type: "LABOR_LEAVE", hours: 8 },
        { day: '11-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '12-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '13-10-2025', type: "WORK_DAY", hours: 8 },
        { day: '14-10-2025', type: "WORK_DAY", hours: 7 },
        { day: '15-10-2025', type: "BUSINESS_TRIP", hours: 8 },
        { day: '16-10-2025', type: "BUSINESS_TRIP", hours: 8},
        { day: '17-10-2025', type: "LATE", hours: 6 },
        { day: '18-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '19-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '20-10-2025', type: "WORK_DAY", hours: 8 },
        { day: '21-10-2025', type: "WORK_DAY", hours: 8 },
        { day: '22-10-2025', type: "SICK_LEAVE", hours: 8 },
        { day: '23-10-2025', type: "SICK_LEAVE", hours: 0 },
        { day: '24-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '25-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '26-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '27-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '28-10-2025', type: "WORK_DAY", hours: 0 },
        { day: '29-10-2025', type: "WITHOUT_PAY", hours: 0 },
        { day: '30-10-2025', type: "WITHOUT_PAY", hours: 0 },
        { day: '31-10-2025', type: "ADDITIONAL_DAY_OFF", hours: 0 }
      ]

        this.myAttendanceListMap = new Map(data.map(item => [item.day, {...item}]))
    },

  }
})