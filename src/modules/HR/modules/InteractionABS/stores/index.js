import { defineStore } from 'pinia'

export const useInteractionABSStore = defineStore('interaction-abs-store', {
    state: () => ({
      listLoading: false,
      list: [
        {
          order: 1,
          employee: 'John Doe',
          position: 'Manager',
          branch: 'Branch 1',
          department: 'Department 1',
          documentName: 'Document 1',
          documentType: 'Type 1',
          operationType: 'Type 1',
          status: 1,
          history: 'History 1',
          actions: 'Actions 1'
        }
      ],
      totalCount: 0,
      headers: [
        {
          field: 'employee',
          header: 'employee',
          width: '13%',
          active: true,
          filter: false,
        },
        {
          field: 'position',
          header: 'position',
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: 'branch',
          header: 'branch',
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: 'department',
          header: 'department',
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: 'documentName',
          header: 'document-name',
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: 'documentType',
          header: 'document-type',
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: 'operationType',
          header: 'operation-type',
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: 'statusAbs',
          header: 'status-abs',
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: 'history',
          header: 'history',
          width: '2%',
          active: true,
          filter: false
        },
        {
          field: 'actions',
          header: 'actions',
          width: '15%',
          active: true,
          filter: false
        }
      ],
      historyHeaders: [
        {
          field: 'employee',
          header: 'employee',
          width: '20%',
          active: true
        },
        {
          field: 'date',
          header: 'date',
          width: '20%',
          active: true
        },
        {
          field: 'status',
          header: 'result-of-action',
          width: '60%',
          active: true
        }
      ]
    }),
    actions: {   
      actionGetInteractionABSList() {
        this.listLoading = false
      }
    }
})
