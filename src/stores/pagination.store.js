import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination-store", {
  state: () => ({
    page: 1,
    pageSize: 10,
    firstRow: 0
  }),
  actions: {
    resetPagination() {
      this.page = 1;
      this.pageSize = 10;
      this.firstRow = 0;
    }
  }
})
