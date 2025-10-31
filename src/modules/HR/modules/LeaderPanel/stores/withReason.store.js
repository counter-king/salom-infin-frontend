import { defineStore } from 'pinia'

export const useWithReasonStore = defineStore('with-reason-stores', {
    state: () => ({
      withReasonListLoading: false,
      withReasonList: [],
      headers: [
        {
          field: 'employee',
          header: 'employee',
          width: '13%',
          active: true,
          filter: false,
        },
        {
          field: 'position',
          header: 'position',
          width: '9%',
          active: true,
          filter: false,
        },
        {
          field: 'date',
          header: 'company',
          width: '9%',
          active: true,
          filter: false,
        },
        {
          field: 'arrivalTime',
          header: 'arrival_time',
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field:  'departureTime',
          header: 'departure_time',
          width: '9%',
          active: true,
          filter: false,
        },
        {
          field: 'status',
          header: 'status',
          width: '9%',
          active: true,
          filter: false,
        },
        {
          field: 'operation_type',
          header: 'operation_type',
          width: '9%',
          active: true,
          filter: false
        },
        {
          field: 'actions',
          header: 'actions',
          width: '15%',
          active: true,
          filter: false
        }
      ]
    }),
    actions: {
      async actionGetIabsActionList(params) {
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
