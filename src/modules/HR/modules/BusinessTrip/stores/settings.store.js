// Core
import { defineStore } from 'pinia'
// Services
import { fetchGetCountryList, fetchGetRegionList, fetchGetTagList } from '../services'
export const useSettingsStore = defineStore("settings-trip-store", {
  state: () => ({
    countryListLoading: false,
    countryListMoreLoading: false,
    countryList : [],
    cityListLoading: false,
    cityListMoreLoading: false,
    cityList : [],
    tripPurposeListLoading: false,
    tripPurposeList : [],
    tripPurposeListTotalCount: 0,
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
    async actionGetCityList(params, resetList = true) {
      if(resetList){
        this.cityListLoading = true;
      } else {
        this.cityListMoreLoading = true;
      }
      try {
        const response= await fetchGetRegionList(params);
        response.data.results = response?.data?.results
        if(resetList){
          this.cityList = response?.data?.results
        } else{
          this.cityList = [...this.cityList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.cityListLoading = false;
        this.cityListMoreLoading = false;
      }
    },
    async actionGetTripPurposeList(params) {
      this.tripPurposeListLoading = true
      try {
        const response= await fetchGetTagList(params);
        response.data.results = response?.data?.results.map((item)=>({
          name: item.name,
          document_sub_type: item?.document_sub_type?.name,
          id: item.id,
        }))
        this.tripPurposeListTotalCount = response?.data?.count
        this.tripPurposeList = response?.data?.results
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.tripPurposeListLoading = false;
      }
    },
  }
})