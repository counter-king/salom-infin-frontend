// Core
import {defineStore} from 'pinia'

export const useSearchStore = defineStore("search-store", {
  state: () => ({
    documentList: [],
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    headers: [
      {
        header: "Названия поиска",
        field: "nameSearch",
        active: true
      },
    ],
    list: [
      {
        header: "Названия поиска",
        field: "nameSearch",
        active: true
      },
    ]
  }),
  actions: {
    async actionGetDocumentList(){

    }
  }
})
