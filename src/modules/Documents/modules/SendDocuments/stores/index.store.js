// Core
import {defineStore} from 'pinia'
import { fetchGetDocumentList } from "@/modules/Documents/modules/SendDocuments/services/index.service";

export const useSDStore = defineStore("sd-store", {
  state: () => ({
    SD_TOOLBAR_MENU_LIST: [
      // Внутренний
      {
        label: "inner",
        icon: "ArrowDownIcon",
        sub_type: "inner",
        active: true
      },
      // Рапорт
      {
        label: "notice",
        icon: "NotesIcon",
        sub_type: "notice",
        active: false
      },
    ],
    documentList: [],
    listLoading: false,
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    headers: [
      {
        header: "№",
        field: "index",
        active: true
      },
      {
        header: "Тип письма",
        field: "type",
        active: true
      },
      {
        header: "Дата создание",
        field: "created_date",
        active: true
      },
      {
        header: "Дата изменения",
        field: "modified_date",
        active: true
      },
      {
        header: "Рег. номер",
        field: "register_number",
        active: true
      },
      {
        header: "Подписант",
        field: "signers",
        active: true
      },
      {
        header: "Состояние",
        field: "status",
        active: true
      },
      {
        header: "Действие",
        field: "action",
        active: false
      }
    ],
    list: []
  }),
  actions: {
    resetHeaders() {
      this.headers = [
        {
          header: "№",
          field: "index",
          active: true
        },
        {
          header: "Тип письма",
          field: "type",
          active: true
        },
        {
          header: "Дата создание",
          field: "created_date",
          active: true
        },
        {
          header: "Дата изменения",
          field: "modified_date",
          active: true
        },
        {
          header: "Рег. номер",
          field: "register_number",
          active: true
        },
        {
          header: "Подписант",
          field: "signers",
          active: true
        },
        {
          header: "Состояние",
          field: "status",
          active: true
        },
        {
          header: "Действие",
          field: "action",
          active: false
        }
      ]
    },
    async actionGetDocumentList(params){
      this.listLoading = true;
      const { data } = await fetchGetDocumentList(params);

      this.documentList = data.results;
      for (let i = 0; i < 30; i++) {
        this.list.push({
          ...data.results[0],
          id: data.results[0].id
        })
      }
      this.totalCount = data.count;

      this.listLoading = false;

      return Promise.resolve(data);
    }
  }
})
