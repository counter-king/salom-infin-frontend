// Core
import { defineStore } from 'pinia'
import {fetchBusinessTripList} from "@/modules/HR/modules/BusinessTrip/services";

export const useBusinessTripStore = defineStore("business-trip-store", {
  state: () => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    detailLoading: false,
    businessTripList: [],
    detailModel: {},
    headers: [
      {
        header: "Название департамент",
        field: "department",
        active: true
      },
      {
        header: "Дата создание",
        field: "created_date",
        active: true
      },
      {
        header: "Автор",
        field: "author",
        active: true
      },
      {
        header: "Статус",
        field: "status",
        active: true
      },
      {
        header: "Филиалы",
        field: "destinations",
        active: true
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
    resetHeaders() {
      this.headers = [
        {
          header: "Название департамент",
          field: "deparment",
          active: true
        },
        {
          header: "Дата создание",
          field: "created_date",
          active: true
        },
        {
          header: "Автор",
          field: "author",
          active: true
        },
        {
          header: "Статус",
          field: "status",
          active: true
        },
        {
          header: "Филиалы",
          field: "destinations",
          active: true
        }
      ]
    }
  }
})
