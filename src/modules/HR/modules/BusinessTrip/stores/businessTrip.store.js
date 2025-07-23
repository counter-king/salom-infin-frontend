// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchAdvanceReportCreate,
  fetchBusinessTripDetail,
  fetchBusinessTripList, fetchMarkBusinessTripArrived, fetchMarkBusinessTripLeft, fetchResetTripVerification,
} from "@/modules/HR/modules/BusinessTrip/services"
import { fetchBlobFile } from "@/services/file.service";
import Props from "@/components/Users/props";

export const useBusinessTripStore = defineStore("business-trip-store", {
  state: () => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    detailLoading: false,
    buttonLoading: false,
    businessTripList: [],
    detailModel: {},
    changingVerificationId: null,
    changingVerificationType: null,
    headers: [
      {
        header: "employee",
        field: "employee",
        active: true
      },
      {
        header: "department-name",
        field: "department",
        active: true
      },
      {
        header: "where-from",
        field: "sender_company",
        active: true
      },
      {
        header: "where-to",
        field: "locations",
        active: true
      },
      {
        header: "start-date",
        field: "start_date",
        active: true
      },
      {
        header: "end-date",
        field: "end_date",
        active: true
      },
      {
        header: "status",
        field: "trip_status",
        active: true
      }
    ],

    advanceReportModel: [
      {
        amount: null,
        comment: null,
        date: null,
        trip: null,
        type: null,
        file: null
      }
    ],
    tripStatuses: [
      {
        label: 'all',
        value: null,
        active: false
      },
      {
        label: "not-started",
        value: "not_started",
        active: false
      },
      {
        label: "on-trip",
        value: "on_trip",
        active: false
      },
      {
        label: "reporting",
        value: "reporting",
        active: false
      },
      {
        label: "closed",
        value: "closed",
        active: false
      }
    ]
  }),
  actions: {
    async actionGetBusinessTripList(params) {
      this.listLoading = true
      const response = await fetchBusinessTripList(params)
      if (response.status === 200) {
        this.businessTripList = response.data.results
        this.totalCount = response.data.count
        this.listLoading = false
      }
    },
    /** **/
    async actionGetBusinessTripDetail(id) {
      this.detailLoading = true
      const response = await fetchBusinessTripDetail(id)
      if (response && response.status === 200) {
        const compose = await Promise.all(
          response.data.compose.map(async item => {
            if (!item.url){
              const blobFiles = await fetchBlobFile(item.file_id)
              return {
                ...item,
                ...blobFiles
              }
            } else {
              return item
            }
          })
        )
        this.detailModel = { ...response.data, compose }
        this.detailLoading = false
      }
    },
    /** **/
    async actionVerifyBusinessTrip(id, tripId, condition) {
      this.detailLoading = true
      if (condition === 'left'){
        const response = await fetchMarkBusinessTripLeft(id)
        if (response && response.status === 200) {
          await this.actionGetBusinessTripDetail(tripId)
        }
      } else {
        const response = await fetchMarkBusinessTripArrived(id)
        if (response && response.status === 200) {
          await this.actionGetBusinessTripDetail(tripId)
        }
      }
    },
    /** **/
    async actionResetTripVerification(type) {
      try {
        const res = await fetchResetTripVerification({
          id: this.changingVerificationId,
          body: {
            type: this.changingVerificationType
          }
        })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /** **/
    actionManageAdvanceReport(index) {
      if (index === 0) {
        this.advanceReportModel.push({
          amount: null,
          comment: null,
          date: null,
          trip: null,
          type: null,
          file: null
        })
      } else {
        this.advanceReportModel.splice(index, 1)
      }
    },
    /** **/
    async actionAdvanceReportCreate(tripId) {
      const arr = this.advanceReportModel.map(item => {
        return {
          ...item,
          trip: tripId
        }
      })
      this.buttonLoading = true
      const response = await fetchAdvanceReportCreate(arr)
      if (response.status === 201) {
        this.buttonLoading = false
      }
    },
    /** **/
    actionResetModel() {
      this.advanceReportModel = [
        {
          amount: null,
          comment: null,
          date: null,
          trip: null,
          type: null,
          file: null
        }
      ]
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
          header: "department-name",
          field: "department",
          active: true
        },
        {
          header: "where-from",
          field: "sender_company",
          active: true
        },
        {
          header: "where-to",
          field: "locations",
          active: true
        },
        {
          header: "start-date",
          field: "start_date",
          active: true
        },
        {
          header: "end-date",
          field: "end_date",
          active: true
        },
        {
          header: "status",
          field: "trip_status",
          active: true
        }
      ]
    }
  }
})
