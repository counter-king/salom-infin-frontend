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
          active: true
        },
        {
          field: 'position',
          header: 'position',
            width: '10%',
            active: true
        },
        {
          field: 'branch',
          header: 'branch',
          width: '10%',
          active: true
        },
        {
          field: 'department',
          header: 'department',
          width: '10%',
          active: true
        },
        {
          field: 'document-name',
          header: 'document-name',
          width: '10%',
          active: true
        },
        {
          field: 'document-type',
          header: 'document-type',
          width: '10%',
          active: true
        },
        {
          field: 'operation-type',
          header: 'operation-type',
          width: '10%',
          active: true
        },
        {
          field: 'status',
          header: 'status-abs',
          width: '10%',
          active: true
        },
        {
          field: 'history',
          header: 'history',
          width: '2%',
          active: true
        },
        {
          field: 'actions',
          header: 'actions',
          width: '15%',
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
