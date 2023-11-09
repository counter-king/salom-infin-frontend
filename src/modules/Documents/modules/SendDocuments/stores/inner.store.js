// Core
import {defineStore} from 'pinia'
// Services
import {fetchGetDocumentList} from "../services/inner.service";

export const useSDInner = defineStore("sd-inner", {
  state: () => ({
    documentList: [],
    filterState: {
      page: 1,
      page_size: 15
    },
    headers: [
      {
        header: "№",
        field: "index"
      },
      {
        header: "Тип письма",
        field: "type"
      },
      {
        header: "Дата создание",
        field: "created_date"
      },
      {
        header: "Дата изменения",
        field: "modified_date"
      },
      {
        header: "Рег. номер",
        field: "register_number"
      },
      {
        header: "Подписант",
        field: "signers"
      },
      {
        header: "Состояние",
        field: "status"
      },
      {
        header: "Действие",
        field: "action"
      }
    ]
  }),
  actions: {
    async actionGetDocumentList(params){
      const { data } = await fetchGetDocumentList(params);

      this.documentList = data.results;

      return Promise.resolve(data);
    }
  }
})
