// Core
import { defineStore } from 'pinia'

export const useBusinessTripStore = defineStore("business-trip-store", {
  state: () => ({
    headers: [
      {
        header: "Название департамент",
        field: "type",
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
        field: "companies",
        active: true
      }
    ],
  }),
  actions: {
    resetHeaders() {
      this.headers = [
        {
          header: "Название департамент",
          field: "type",
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
          field: "companies",
          active: true
        }
      ]
    }
  }
})
