import {defineStore} from 'pinia'
export const useSearchStore = defineStore("search-store", {
  state: () => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    list:[
      {
        number: '1',
        nameTechnique:'Монитор Avtech 27',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
      {
        number: '2',
        nameTechnique:'Macbook - Apple M1',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
      {
        number: '3',
        nameTechnique:'Компютер - Lenovo P330',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
      {
        number: '4',
        nameTechnique:'Macbook - Apple M1',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
      {
        number: '5',
        nameTechnique:'Монитор Avtech 27',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
      {
        number: '6',
        nameTechnique:'Монитор Avtech 27',
        id: '468234590',
        inb: '44DB135SSN2690',
        dateEntered:'26.08.2023'
      },
    ],
    headers:[
        {
          header: '№',
          field: 'number',

        },
        {
          header: "Название техники",
          field: "nameTechnique",
        },
        {
          header: 'ID',
          field: 'id',
        },
        {
          header: 'ИНВ',
          field: 'inb',
        },
        {
          header: 'Дата ввода',
          field: 'dateEntered',
        },

    ],
  }),
  actions: {
    async actionGetDocumentList(){

    }
  }
})
