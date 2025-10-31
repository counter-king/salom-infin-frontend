import { defineStore } from 'pinia'

export const useWithReasonStore = defineStore('with-reason-stores', {
    state: () => ({
      withReasonListLoading: false,
      withReasonList: [],
      headers: [
        {
          field: 'employee',
          header: 'employee',
          active: true,
          filter: false,
        },
        {
          field: 'position',
          header: 'position',
          active: true,
          filter: false,
        },
        {
          field: 'date',
          header: 'company',
          active: true,
          filter: false,
        },
        {
          field: 'arrivalTime',
          header: 'arrival_time',
          active: true,
          filter: false,
        },
        {
          field:  'departureTime',
          header: 'departure_time',
          active: true,
          filter: false,
        },
        {
          field: 'status',
          header: 'status',
          active: true,
          filter: false,
        }
      ]
    }),
    actions: {
      async getAttendanceExceptionsWithReasonList(params) {
        this.withReasonListLoading = true
        try {
        } catch (error) {
          console.log(error)
        } finally {
          this.withReasonListLoading = false
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
