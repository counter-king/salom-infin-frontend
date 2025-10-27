// Core
import { defineStore } from 'pinia'
// services
import { fetchGetMyAttendanceList, fetchGetMyAttendanceSummary } from '../services'

export const useMyAttendanceStore = defineStore("my-attendance-store", {
  state: () => ({
    myAttendanceListMap: new Map(),
    myAttendanceList: [],
    myAttendanceListTotalCount: 0,
    myAttendanceListLoading: false,
    myAttendanceSummary: null,
    myAttendanceSummaryLoading: false,
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
        header: "status",
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
      const response =  {
          count: 30,
          next: null,
          previous: null,
          results: [
            {
              id: 1,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-01",
              first_check_in: "2025-09-01T08:58:00+0500",
              last_check_out: "2025-09-01T18:00:00+0500",
              worked_seconds: 32400,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "came-on-time",
              check_out_status: "normal-exit",
              has_reason: false,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 2,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-02",
              first_check_in: "2025-09-02T09:18:00+0500",
              last_check_out: "2025-09-02T17:45:00+0500",
              worked_seconds: 29820,
              late_minutes: 18,
              early_leave_minutes: 15,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "early-departure",
              has_reason: false,
              user_status: { id: 2, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 3,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-03",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              // user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" }
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }

            },
            {
              id: 4,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-04",
              first_check_in: "2025-09-04T09:45:00+0500",
              last_check_out: "2025-09-04T18:00:00+0500",
              worked_seconds: 27900,
              late_minutes: 45,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "normal-exit",
              has_reason: true,
              // user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 5,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-05",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 8,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-08",
              first_check_in: "2025-09-08T09:10:00+0500",
              last_check_out: "2025-09-08T17:30:00+0500",
              worked_seconds: 30000,
              late_minutes: 10,
              early_leave_minutes: 30,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "early-departure",
              has_reason: false,
              // user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 9,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-09",
              first_check_in: "2025-09-09T09:00:00+0500",
              last_check_out: "2025-09-09T18:00:00+0500",
              worked_seconds: 32400,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "came-on-time",
              check_out_status: "normal-exit",
              has_reason: false,
              // user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" }
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 10,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-10",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              // user_status: { id: 6, name: "Bolnichniy", code: "B", code_type: "SICK_LEAVES" }
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }

            },
            {
              id: 11,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-11",
              first_check_in: "2025-09-11T09:25:00+0500",
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 25,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "no-exit-marked",
              has_reason: true,
              // user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }

            },
            {
              id: 12,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-12",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              // user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" }
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }
            },
            {
              id: 15,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-15",
              first_check_in: "2025-09-15T09:05:00+0500",
              last_check_out: "2025-09-15T18:00:00+0500",
              worked_seconds: 32100,
              late_minutes: 5,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "normal-exit",
              has_reason: false,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" }
              // user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" }
            },
            {
              id: 16,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-16",
              first_check_in: "2025-09-16T09:00:00+0500",
              last_check_out: "2025-09-16T18:00:00+0500",
              worked_seconds: 32400,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "came-on-time",
              check_out_status: "no-exit-marked",
              has_reason: false,
              user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" }
            },
            {
              id: 17,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-17",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 7, name: "Komandirovka", code: "K", code_type: "BUSINESS_TRIP" }
            },
            {
              id: 18,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-18",
              first_check_in: "2025-09-18T09:30:00+0500",
              last_check_out: "2025-09-18T17:45:00+0500",
              worked_seconds: 29700,
              late_minutes: 30,
              early_leave_minutes: 15,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "early-departure",
              has_reason: false,
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
            },
            {
              id: 19,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-19",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" }
            },
            {
              id: 22,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-22",
              first_check_in: "2025-09-22T09:15:00+0500",
              last_check_out: "2025-09-22T18:00:00+0500",
              worked_seconds: 31500,
              late_minutes: 15,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "normal-exit",
              has_reason: true,
              // user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
              user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" }

            },
            {
              id: 23,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-23",
              first_check_in: "2025-09-23T09:00:00+0500",
              last_check_out: "2025-09-23T17:30:00+0500",
              worked_seconds: 30600,
              late_minutes: 0,
              early_leave_minutes: 30,
              present: true,
              absent: false,
              check_in_status: "came-on-time",
              check_out_status: "early-departure",
              has_reason: false,
              user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" }
            },
            {
              id: 24,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-24",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 8, name: "Uchenicheskiy otpusk", code: "OU", code_type: "STUDY_LEAVE" }
            },
            {
              id: 25,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-25",
              first_check_in: "2025-09-25T09:20:00+0500",
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 20,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "no-exit-marked",
              has_reason: true,
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
            },
            {
              id: 26,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-26",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 3, name: "Ishda", code: "A", code_type: "WORKERS" }
            },
            {
              id: 29,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-29",
              first_check_in: "2025-09-29T09:40:00+0500",
              last_check_out: "2025-09-29T17:50:00+0500",
              worked_seconds: 29400,
              late_minutes: 40,
              early_leave_minutes: 10,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "early-departure",
              has_reason: true,
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" }
            },
            {
              id: 30,
              user: {
                id: 1,
                full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
                position: { id: 3, name: "Boshqaruv Raisi" },
                color: "#FF9800",
                top_level_department: { id: 25, name: "Bank Rahbariyati" },
                company: { id: 16, name: "Bosh ofis - None" }
              },
              date: "2025-09-30",
              first_check_in: null,
              last_check_out: null,
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 10, name: "Dekret bolnichniy", code: "DB", code_type: "SICK_LEAVE_DECREE" }
            }
          ]
      }
      this.myAttendanceListLoading = true
      try {
        const res = await fetchGetMyAttendanceList(params)
        // this.myAttendanceListMap = new Map(res.data.results.map(item => [item.date, {...item, type: item.user_status.code}]))
        // this.myAttendanceList = res.data.results
        // this.myAttendanceListTotalCount = res.data.count
        this.myAttendanceListMap = new Map(response.results.map(item => [item.date, {...item, type: item.user_status.code}]))
        this.myAttendanceList = response.results
        this.myAttendanceListTotalCount = response.count
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.myAttendanceListLoading = false
      }
    },
    async getMyAttendanceSummary(params) {
      this.myAttendanceSummaryLoading = true
      try {
        const res = await fetchGetMyAttendanceSummary(params)
        this.myAttendanceSummary = res.data
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.myAttendanceSummaryLoading = false
      }
    },
  }
})