// Core
import { defineStore } from 'pinia'
// Service
import {fetchSignDetail, fetchSignList} from "@/modules/Documents/modules/Boxes/services/sign.service";
import {fetchGetTree} from "@/modules/Documents/modules/Registration/services/docflow.service";


export const useBoxesSignStore = defineStore("sign-stores", {
  state: () => ({
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    listLoading: false,
    detailLoading: false,
    documentList: [],
    detailModel: {},
    tree: null,
    headers: [
      // {
      //   header: "№",
      //   field: "index",
      //   active: true
      // },
      {
        header: "Статус",
        field: "status",
        active: true
      },
      {
        header: "Рег. номер",
        field: "register_number",
        active: true
      },
      {
        header: "Тип письма",
        field: "document_type",
        active: true
      },
      {
        header: "Рег. дата",
        field: "register_date",
        active: true
      },
      {
        header: "Подписант",
        field: "signers",
        active: true
      },
      {
        header: "Автор",
        field: "author",
        active: true
      },
      {
        header: "Краткое описание",
        field: "short_description",
        active: true
      },
    ]
  }),
  actions: {
    resetHeaders() {
      this.headers = [
        // {
        //   header: "№",
        //   field: "index",
        //   active: true
        // },
        {
          header: "Статус",
          field: "status",
          active: true
        },
        {
          header: "Рег. номер",
          field: "register_number",
          active: true
        },
        {
          header: "Тип письма",
          field: "document_type",
          active: true
        },
        {
          header: "Рег. дата",
          field: "register_date",
          active: true
        },
        {
          header: "Подписант",
          field: "signers",
          active: true
        },
        {
          header: "Автор",
          field: "author",
          active: true
        },
        {
          header: "Краткое описание",
          field: "short_description",
          active: true
        },
      ]
    },
    /** **/
    async actionGetSignList(params) {
      this.listLoading = true;
      const response = await fetchSignList(params);
      if (response.status === 200) {
        this.documentList = response.data.results;
        this.totalCount = response.data.count;
        this.listLoading = false;
      }
    },
    /** **/
    async actionGetSignDetail(id) {
      this.detailLoading = true;
      const response = await fetchSignDetail(id);
      if (response.status === 200) {
        if (response.data?.compose?.registered_document){
          let { data } = await fetchGetTree(response.data?.compose?.registered_document)
          this.tree = data
        }
        this.detailModel = response.data;
        this.detailLoading = false;
      }
    }
  }
})
