// Core
import { defineStore } from "pinia"
// Utils
import { clearModel } from "@/utils";

export const useFilterStore = defineStore("filter-stores", {
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
      register_date: null,
      signers: [],
      __signers: [],
      status: [],
      __status: [],
      users: [],
      __users: [],
      branches: [],
      __branches: [],
      document_types: [],
      __document_types: [],
      document_sub_types: [],
      __document_sub_types: [],
      department_recipients: [],
      __department_recipients: [],
      branch_recipients: [],
      __branch_recipients: []
    }
  }),
  actions: {
    resetFilterState() {
      clearModel(this.filterState);
    }
  }
})
