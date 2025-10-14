// Core
import { defineStore } from 'pinia'

export const useMyApplicationStore = defineStore("my-application-store", {
  state: () => ({
    currentApplicationList: [{
      date: '2025-05-15',
      reason_for_explanation: 'Tushuntirish sababi',
      reason: 'Sabab',
      reason_entered_time: 'Sabab kiritilgan vaqt',
      current_status: 'Hozirgi holati'
    }],
    currentApplicationTotalCount: 0,
    currentApplicationListLoading: false,
    archiveApplicationList: [{
      date: '2025-05-15',
      reason_for_explanation: 'Tushuntirish sababi',
      reason: 'Sabab',
      reason_entered_time: 'Sabab kiritilgan vaqt',
      current_status: 'Hozirgi holati'
    }],
    archiveApplicationTotalCount: 0,
    archiveApplicationListLoading: false,
    currentHeaders: [
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "reason-for-explanation",
        field: "reason_for_explanation",
        active: true
      },
      {
        header: "reason",
        field: "reason",
        active: true
      },
      {
        header: "reason-entered-time",
        field: "reason_entered_time",
        active: true
      },
      {
        header: "current-status",
        field: "current_status",
        active: true
      }
    ],
    archiveHeaders: [
      {
        header: "date",
        field: "date",
        active: true
      },
      {
        header: "reason-for-explanation",
        field: "reason_for_explanation",
        active: true
      },
      {
        header: "reason",
        field: "reason",
        active: true
      },
      {
        header: "reason-entered-time",
        field: "reason_entered_time",
        active: true
      },
      {
        header: "current-status",
        field: "current_status",
        active: true
      }
    ]
  }),
  actions: {
    /** **/
    async getMyApplicationList(params) {},
    async getArchiveApplicationList(params) {},

  }
})