// Core
import { defineStore } from 'pinia'
import {fetchApprovalDetail, fetchApprovalList} from "@/modules/Documents/modules/Boxes/services/approval.service";
import {fetchGetTree} from "@/modules/Documents/modules/Registration/services/docflow.service";
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
import { COMPOSE_DOCUMENT_SUB_TYPES } from "@/enums";

export const useBoxesApprovalStore = defineStore("approval-stores", {
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
        header: "status",
        field: "status",
        active: true
      },
      {
        header: "Рег. номер",
        field: "register_number",
        active: true
      },
      {
        header: "letter-type",
        field: "document_type",
        active: true
      },
      {
        header: "Рег. дата",
        field: "register_date",
        active: true
      },
      {
        header: "signer",
        field: "signers",
        active: true
      },
      {
        header: "author",
        field: "author",
        active: true
      },
      {
        header: "short-description",
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
          header: "status",
          field: "status",
          active: true
        },
        {
          header: "Рег. номер",
          field: "register_number",
          active: true
        },
        {
          header: "letter-type",
          field: "document_type",
          active: true
        },
        {
          header: "Рег. дата",
          field: "register_date",
          active: true
        },
        {
          header: "signer",
          field: "signers",
          active: true
        },
        {
          header: "author",
          field: "author",
          active: true
        },
        {
          header: "short-description",
          field: "short_description",
          active: true
        },
      ]
    },
    /** **/
    async actionGetApprovalList(params) {
      this.listLoading = true;
      const response = await fetchApprovalList(params)
      if (response.status === 200) {
        this.documentList = response.data.results
        this.totalCount = response.data.count
        this.listLoading = false
      }
    },
    /** **/
    async actionGetApprovalDetail(id) {
      this.detailLoading = true;
      const response = await fetchApprovalDetail(id)
      if (response.status === 200) {
        await useSDStore().actionVersionHistory(response.data?.compose?.id)
        if (response.data?.compose?.registered_document){
          let { data } = await fetchGetTree(response.data?.compose?.registered_document)
          this.tree = data
        }
        if (response?.data?.compose?.document_sub_type?.id === Number(COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2) && response.data.compose.trip_notice_id) {
          useSDStore().actionGetDocumentDetailForCustomUse(response.data.compose.trip_notice_id)
            .then(res => {
              this.detailModel = {
                ...response.data,
                compose: {
                  ...response.data.compose,
                  notices: res.data.notices,
                  trip_notice_register_number: res?.data?.register_number,
                  bookings: res?.data?.bookings,
                  trip_plans: res?.data?.trip_plans
                }
              }
            })
        } else {
          this.detailModel = response.data
        }
        setTimeout(() => {
          this.detailLoading = false
        }, 1000)
      }
    }
  }
})
