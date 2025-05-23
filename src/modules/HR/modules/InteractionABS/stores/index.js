import { defineStore } from 'pinia'
import { getCompanyList, getTopDepartmentsList, getDocumentTypeList, getDocumentSubTypeList } from '../services'
import { HEADERS, HEADERS_TITLE } from '../enums'

export const useInteractionABSStore = defineStore('interaction-abs-store', {
    state: () => ({
      listLoading: false,
      companyListLoading: false,
      companyList: [],
      topDepartmentsListLoading: false,
      topDepartmentsList: [],
      documentTypeListLoading: false,
      documentTypeList: [],
      documentSubTypeListLoading: false,
      documentSubTypeList: [],
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
          field: HEADERS.EMPLOYEE,
          header: HEADERS_TITLE[HEADERS.EMPLOYEE],
          width: '13%',
          active: true,
          filter: false,
        },
        {
          field: HEADERS.POSITION,
          header: HEADERS_TITLE[HEADERS.POSITION],
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: HEADERS.BRANCH,
          header: HEADERS_TITLE[HEADERS.BRANCH],
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: HEADERS.DEPARTMENT,
          header: HEADERS_TITLE[HEADERS.DEPARTMENT],
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field:  HEADERS.DOCUMENT_TYPE,
          header: HEADERS_TITLE[HEADERS.DOCUMENT_TYPE],
          width: '10%',
          active: true,
          filter: false,
        },
        {
          field: HEADERS.DOCUMENT_SUB_TYPE,
          header: HEADERS_TITLE[HEADERS.DOCUMENT_SUB_TYPE],
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.OPERATION_TYPE,
          header: HEADERS_TITLE[HEADERS.OPERATION_TYPE],
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.STATUS_ABS,
          header: HEADERS_TITLE[HEADERS.STATUS_ABS],
          width: '10%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.HISTORY,
          header: HEADERS_TITLE[HEADERS.HISTORY],
          width: '5%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.ACTIONS,
          header: HEADERS_TITLE[HEADERS.ACTIONS],
          width: '12%',
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
      async actionGetInteractionABSList() {
        this.listLoading = false
      },
      async actionGetCompanyList(params, resetList= true) {
        try {
          if(resetList){
            this.companyListLoading = true
          } 
          const response = await getCompanyList(params)
          if(resetList){
            this.companyList = response.data.results
          } else {
            this.companyList = [...this.companyList, ...response.data.results]
          }
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.companyListLoading = false
        }
      },
      async actionGetTopDepartmentsList(params, resetList= true) {
        try {
          if(resetList){
            this.topDepartmentsListLoading = true
          } 
          const response = await getTopDepartmentsList(params)
          if(resetList){
            this.topDepartmentsList = response.data.results
          } else {
            this.topDepartmentsList = [...this.topDepartmentsList, ...response.data.results]
          }
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.topDepartmentsListLoading = false
        }
      },
      async actionGetDocumentTypeList(params, resetList= true) {
        try {
          if(resetList){
            this.documentTypeListLoading = true
          } 
          const response = await getDocumentTypeList(params)
          if(resetList){
            this.documentTypeList = response.data.results
          } else {
            this.documentTypeList = [...this.documentTypeList, ...response.data.results]
          }
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.documentTypeListLoading = false
        }
      },
      async actionGetDocumentSubTypeList(params, resetList= true) {
        try {
          if(resetList){
            this.documentSubTypeListLoading = true
          } 
          const response = await getDocumentSubTypeList(params)
          if(resetList){
            this.documentSubTypeList = response.data.results
          } else {
            this.documentSubTypeList = [...this.documentSubTypeList, ...response.data.results]
          }
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.documentSubTypeListLoading = false
        }
      },

    }
})
