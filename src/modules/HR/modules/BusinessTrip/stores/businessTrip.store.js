// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchAdvanceReportCreate,
  fetchBusinessTripDetail,
  fetchBusinessTripList, fetchMarkBusinessTripArrived, fetchMarkBusinessTripLeft,
} from "@/modules/HR/modules/BusinessTrip/services"

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
    headers: [
      {
        header: "department-name",
        field: "department",
        active: true
      },
      {
        header: "created-date",
        field: "created_date",
        active: true
      },
      {
        header: "author",
        field: "author",
        active: true
      },
      {
        header: "status",
        field: "status",
        active: true
      },
      {
        header: "branch",
        field: "destinations",
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
        this.detailModel = response.data
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
          header: "department-name",
          field: "department",
          active: true
        },
        {
          header: "created-date",
          field: "created_date",
          active: true
        },
        {
          header: "author",
          field: "author",
          active: true
        },
        {
          header: "status",
          field: "status",
          active: true
        },
        {
          header: "branch",
          field: "destinations",
          active: true
        }
      ]
    }
  }
})
