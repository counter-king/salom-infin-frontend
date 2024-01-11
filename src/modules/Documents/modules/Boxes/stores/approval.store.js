// Core
import { defineStore } from 'pinia'
import {fetchApprovalDetail, fetchApprovalList} from "@/modules/Documents/modules/Boxes/services/approval.service";

export const useBoxesApprovalStore = defineStore("approval-store", {
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
    headers: [
      {
        header: "№",
        field: "index",
        active: true
      },
      {
        header: "Рег. номер",
        field: "register_number",
        active: true
      },
      {
        header: "Тип письма",
        field: "type",
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
        {
          header: "№",
          field: "index",
          active: true
        },
        {
          header: "Рег. номер",
          field: "register_number",
          active: true
        },
        {
          header: "Тип письма",
          field: "type",
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
    async actionGetApprovalList(params) {
      this.listLoading = true;
      const response = await fetchApprovalList(params);
      if (response.status === 200) {
        this.documentList = response.data.results;
        this.totalCount = response.data.count;
        this.listLoading = false;
      }
    },
    /** **/
    async actionGetApprovalDetail(id) {
      this.detailLoading = true;
      const response = await fetchApprovalDetail(id);
      if (response.status === 200) {
        this.detailModel = response.data;
        setTimeout(() => {
          this.detailLoading = false;
        }, 1000);
      }
    }
  }
})
