// Core
import {defineStore} from 'pinia'

export const useSearchStore = defineStore("search-store", {
  state: () => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    list:[
      {
        nameRu:'Приказы и расспоражения',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023'
      },
      {
        nameRu:'Приказы и расспоражения',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023'
      },
      {
        nameRu:'Компютер - Lenovo P330',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023'
      },
      {
        nameRu:'Приказы и расспоражения',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023'
      },
      {
        nameRu:'Приказы и расспоражения',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023'
      },
      {
        nameRu:'Приказы и расспоражения',
        nameUZ: 'Buyruq va farmoyishlar',
        creatData: '20.11.2023',
      },
    ],
    headers:[
        {
          header: "Наименование (RU)",
          field: "nameRu",
        },
        {
          header: 'Наименование (UZ)',
          field: 'nameUZ',
        },
        {
          header: 'Создано',
          field: 'creatData',
        },
        {
          header: 'Действия',
          field: 'action',
          width: '100px'
        },

    ],
  }),
  actions: {
    async actionGetDocumentList(){

    }
  }
})
