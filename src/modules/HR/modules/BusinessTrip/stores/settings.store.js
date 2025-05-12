// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetCountryList } from '../services'
export const useSettingsStore = defineStore("settings-trip-store", {
  state: () => ({
    countryListLoading: false,
    countryListMoreLoading: false,
    countryList : []
  }),
  actions: {
    async actionGetCountryList(params, resetList = true) {
      if(resetList){
        this.countryListLoading = true;
      } else {
        this.countryListMoreLoading = true;
      }
      try {
        const response= await fetchGetCountryList(params);
        response.data.results = response?.data?.results
        if(resetList){
          this.countryList = response?.data?.results
        } else{
          this.countryList = [...this.countryList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.countryListLoading = false;
        this.countryListMoreLoading = false;
      }
    },
  }
})