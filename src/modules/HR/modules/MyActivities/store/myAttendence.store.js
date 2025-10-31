// Core
import { defineStore } from 'pinia'
// services
import { fetchCreateAttendanceExceptions, fetchGetMyAttendanceList, fetchGetMyAttendanceSummary } from '../services'
import { AlarmBoldIcon, AlarmTurnOffBoldIcon, CalendarDateBoldIcon, CalendarSearchBoldIcon, CheckCircleBoldIcon, TreePalmIcon } from '@/components/Icons';


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
        field: "first_check_in",
        active: true
      },
      {
        header: "departure-time",
        field: "last_check_out",
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
    ],
    myStatistics: [
      {
          id: 'working_days',
          icon: CalendarDateBoldIcon,
          iconClass: "bg-success-500 text-white",
          title: 'short-day',
          count: 23,
          description: 'working-days',
          toolTipInfo: {
              value: 'attendance-tooltip.working-days'
          }
      },
      {
          id: 'working_hours',
          icon: AlarmBoldIcon,
          iconClass: "bg-primary-500 text-white",
          title: 'short-hour',
          count: 160,
          description: 'working-hours',
          toolTipInfo: {
              value: 'attendance-tooltip.working-hours'
          }
      },
      {
          id: 'off_working_days',
          icon: TreePalmIcon,
          iconClass: "bg-critic-300 text-white",
          title: 'short-day',
          count: 8,
          description: 'weekend-days',
          toolTipInfo: {
              value: 'attendance-tooltip.weekend-days'
          }
      },
      {
          id: 'worked_hours',
          icon: CheckCircleBoldIcon,
          iconClass: "bg-primary-500 text-white",
          title: 'short-hour',
          count: 56,
          description: 'worked-hours',
          toolTipInfo: {
              value: 'attendance-tooltip.worked-hours'
          }
      },
      {
          id: "absent_hours",
          icon: AlarmTurnOffBoldIcon,
          iconClass: "bg-warning-500 text-white",
          title: 'short-hour',
          count: 48,
          description: 'absence-hours',
          toolTipInfo: {
              value: 'attendance-tooltip.absence-hours'
          }
      },
      {
          id: "remaining_hours",
          icon: CalendarSearchBoldIcon,
          iconClass: "bg-critic-300 text-white",
          title: 'short-hour',
          count: -83,
          description: 'remaining-hours',
          toolTipInfo: {
              value: 'attendance-tooltip.remaining-hours',
              placement: "left"
          }
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
          // results: [ {
          //   id: 1,
          //   user: {
          //     id: 1,
          //     full_name: "Eshmatov Toshmat Sarvarxo‘ja o‘g‘li",
          //     position: { id: 3, name: "Boshqaruv Raisi" },
          //     color: "#FF9800",
          //     top_level_department: { id: 25, name: "Bank Rahbariyati" },
          //     company: { id: 16, name: "Bosh ofis - None" }
          //   },
          //   date: "2025-09-16",
          //   first_check_in: "2025-09-16T09:00:00+0500",
          //   last_check_out: "2025-09-16T18:00:00+0500",
          //   worked_seconds: 32400,
          //   late_minutes: 0,
          //   early_leave_minutes: 0,
          //   present: true,
          //   absent: false,
          //   check_in_status: "came-on-time",
          //   check_out_status: "no-exit-marked",
          //   has_reason: false,
          //   user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" },
          //   violations: [
          //     { kind: "missed_checkout", has_appeal: false }
          //   ]
          // }]
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
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
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
              early_leave_minutes: 120,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "early-departure",
              has_reason: false,
              user_status: { id: 2, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "late", has_appeal: false },
                { kind: "early_leave", has_appeal: false }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "absent", has_appeal: false }
              ]
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
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "late", has_appeal: true }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" },
              violations: []
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
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "late", has_appeal: false },
                { kind: "early_leave", has_appeal: false }
              ]
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
              user_status: { id: 4, name: "Trudovoy otpusk", code: "OT", code_type: "LABOR_LEAVE" },
              violations: []
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: []
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
              worked_seconds: 0,
              late_minutes: 25,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "no-exit-marked",
              has_reason: true,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "late", has_appeal: true },
                { kind: "missed_checkout", has_appeal: true }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "absent", has_appeal: false }
              ]
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
              user_status: { id: 1, name: "LABOR_LEAVE", code: "OT", code_type: "LABOR_LEAVE" },
              violations: [
                { kind: "late", has_appeal: false }
              ]
            },
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
              user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "missed_checkout", has_appeal: false }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 7, name: "Komandirovka", code: "K", code_type: "BUSINESS_TRIP" },
              violations: []
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
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "late", has_appeal: false },
                { kind: "early_leave", has_appeal: false }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" },
              violations: [
                { kind: "absent", has_appeal: false }
              ]
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
              user_status: { id: 3, name: "Bez soderzhaniya", code: "OB", code_type: "NO_CONTENT" },
              violations: [
                { kind: "late", has_appeal: true }
              ]
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
              user_status: { id: 1, name: "Ishda", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "early_leave", has_appeal: false }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 8, name: "Uchenicheskiy otpusk", code: "OU", code_type: "STUDY_LEAVE" },
              violations: []
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
              worked_seconds: 0,
              late_minutes: 20,
              early_leave_minutes: 0,
              present: true,
              absent: false,
              check_in_status: "late-arrival",
              check_out_status: "no-exit-marked",
              has_reason: true,
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "late", has_appeal: true },
                { kind: "missed_checkout", has_appeal: true }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "not-came",
              check_out_status: "not-came",
              has_reason: false,
              user_status: { id: 3, name: "Ishda", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "absent", has_appeal: false }
              ]
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
              user_status: { id: 2, name: "Kechikkan", code: "A", code_type: "WORKERS" },
              violations: [
                { kind: "late", has_appeal: true },
                { kind: "early_leave", has_appeal: true }
              ]
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
              worked_seconds: 0,
              late_minutes: 0,
              early_leave_minutes: 0,
              present: false,
              absent: true,
              check_in_status: "excused",
              check_out_status: "excused",
              has_reason: true,
              user_status: { id: 10, name: "Dekret bolnichniy", code: "DB", code_type: "SICK_LEAVE_DECREE" },
              violations: []
            }
          ]
      }
      this.myAttendanceListLoading = true
      try {
        const res = await fetchGetMyAttendanceList(params)
        this.myAttendanceListMap = new Map(res.data.results.map(item => [item.date, {...item, type: item.user_status.code}]))
        this.myAttendanceList = res.data.results
        this.myAttendanceListTotalCount = res.data.count
        // this.myAttendanceListMap = new Map(response.results.map(item => [item.date, {...item, type: item.user_status.code}]))
        // this.myAttendanceList = response.results
        // this.myAttendanceListTotalCount = response.count
        return res
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.myAttendanceListLoading = false
      }
    },
    async getMyAttendanceSummary(params) {
      this.myAttendanceSummaryLoading = true
      try {
        const { data } = await fetchGetMyAttendanceSummary(params)
        this.myAttendanceSummary = data
        this.myStatistics = this.myStatistics.map(item => {
          if(item.id === 'remaining_hours') {
            item.count = data.working_hours - data.worked_hours
          } else {
            item.count = data[item.id] || 0
          }
          return item
        })
        return data
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.myAttendanceSummaryLoading = false
      }
    },

  }
})