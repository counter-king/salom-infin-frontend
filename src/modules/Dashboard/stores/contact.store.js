import { defineStore } from "pinia";
import {
  fetchAddContactToFavourites,
  fetchDashboardContacts,
  fetchDashboardFavouriteContacts, fetchDeleteContactFromFavourites
} from "@/modules/Dashboard/services/index.service";

export const useDashboardContactStore = defineStore('dashboardContactStore', {
  state: () => ({
    tabItems: [
      {
        id: 1,
        label: 'favourites',
        value: 'favourites',
        active: true
      },
      {
        id: 2,
        label: 'all',
        value: 'all',
        active: false
      }
    ],
    listLoading: false,
    dashboardContactList: []
  }),
  actions: {
    async actionGetDashboardContacts(params = {}) {
      this.listLoading = true
      try {
        const res = await fetchDashboardContacts(params)
        this.dashboardContactList = res?.data?.results
      } catch (err) {}
      finally {
        this.listLoading = false
      }
    },
    async actionGetDashboardFavouriteContacts(params = {}) {
      this.listLoading = true
      try {
        const res = await fetchDashboardFavouriteContacts(params)
        this.dashboardContactList = res?.data?.results.map(item => ({
          ...item.user,
          id: item?.user?.id,
          favourite_id: item.id,
          is_selected: true
        }))
      } catch (err) {}
      finally {
        this.listLoading = false
      }
    },
    async actionAddContactToFavourites(body) {
      try {
        const res = await fetchAddContactToFavourites(body)
        return Promise.resolve(res)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async actionDeleteContactFromFavourites(id) {
      try {
        const res = await fetchDeleteContactFromFavourites(id)
        return Promise.resolve(res)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
})
