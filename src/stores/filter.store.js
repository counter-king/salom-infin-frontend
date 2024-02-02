// Core
import { defineStore } from "pinia"
// Utils
import { clearModel } from "@/utils";

export const useFilterStore = defineStore("filter-store", {
  state: () => ({
    filterState: {
      approvers: [],
      __approvers: [],
      author: [],
      __author: [],
      created_start_date: null,
      created_end_date: null,
      curator: [],
      __curator: [],
      departments: [],
      __departments: [],
      register_number: null,
      signers: [],
      __signers: [],
      status: [],
      __status: []
    }
  }),
  actions: {
    resetFilterState() {
      clearModel(this.filterState);
    }
  }
})
