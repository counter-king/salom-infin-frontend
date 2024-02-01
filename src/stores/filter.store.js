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
      curator: [],
      __curator: [],
      departments: [],
      __departments: [],
      signers: [],
      __signers: [],
    }
  }),
  actions: {
    resetFilterState() {
      clearModel(this.filterState);
    }
  }
})
