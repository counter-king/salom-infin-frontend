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
        code: 'Рапорт - 42-77/1631',
        // signers: 'Рапорт - 42-77/1631',
      },
      {
        code: 'Рапорт - 42-77/1632',
      },
      {
        code: 'Рапорт - 42-77/1633',
      },
      {
        code: 'Рапорт - 42-77/1634',
      },
      {
        code: 'Рапорт - 42-77/1635',
      },
      {
        code: 'Рапорт - 42-77/1636',
      },
      {
        code: 'Рапорт - 42-77/1637',
      },
      {
        code: 'Рапорт - 42-77/1638',
      },
      {
        code: 'Рапорт - 42-77/1639',
      },
      {
        code: 'Рапорт - 42-77/1630',
      },
    ],
    headers:[
        {
          header: 'Code',
          field: 'code'
        },
        {
          header: "Подписант",
          field: "signers"
        },
    ],
  }),
  actions: {
    async actionGetDocumentList(){

    }
  }
})
