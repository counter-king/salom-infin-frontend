import { defineStore } from 'pinia'
import { getCompanyList, getTopDepartmentsList, getDocumentTypeList, getDocumentSubTypeList, getIabsActionList, getIabsRequestCalls, fetchGetUsersList } from '../services'
import { HEADERS, HEADERS_TITLE } from '../enums'

export const useInteractionABSStore = defineStore('interaction-abs-store', {
    state: () => ({
      iabsActionListLoading: false,
      iabsActionList: [],
      companyListLoading: false,
      companyList: [],
      topDepartmentsListLoading: false,
      topDepartmentsList: [],
      documentTypeListLoading: false,
      documentTypeList: [],
      documentSubTypeListLoading: false,
      documentSubTypeList: [],
      iabsActionListTotalCount: 0,
      iabsRequestCallsLoading: false,
      iabsRequestCalls: [],
      iabsRequestCallsTotalCount: 0,
      usersListLoading: false,
      usersList: [],
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
          width: '9%',
          active: true,
          filter: false,
        },
        {
          field: HEADERS.COMPANY,
          header: HEADERS_TITLE[HEADERS.COMPANY],
          width: '9%',
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
          width: '9%',
          active: true,
          filter: false,
        },
        // {
        //   field: HEADERS.DOCUMENT_SUB_TYPE,
        //   header: HEADERS_TITLE[HEADERS.DOCUMENT_SUB_TYPE],
        //   width: '10%',
        //   active: true,
        //   filter: false
        // },
        {
          field: HEADERS.OPERATION_TYPE,
          header: HEADERS_TITLE[HEADERS.OPERATION_TYPE],
          width: '9%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.TYPE,
          header: HEADERS_TITLE[HEADERS.TYPE],
          width: '6%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.STATUS_ABS,
          header: HEADERS_TITLE[HEADERS.STATUS_ABS],
          width: '8%',
          active: true,
          filter: false
        },
        {
          field: HEADERS.CREATE_DATE,
          header: HEADERS_TITLE[HEADERS.CREATE_DATE],
          width: '6%',
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
          width: '15%',
          active: true,
          filter: false
        }
      ],
      historyHeaders: [
        {
          field: 'caller',
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
          width: '20%',
          active: true
        },
        {
          field: 'responseText',
          header: 'response-result',
          width: '40%',
          active: true
        }
      ]
    }),
    actions: {   
      async actionGetIabsActionList(params) {
        this.iabsActionListLoading = true
        try {
          const response = await getIabsActionList(params)
          this.iabsActionList = response.data?.results?.map((item)=>({
            id: item.id,
            user: item.user,
            position: item.user.position,
            company: item.user.company,
            department: item.user.top_level_department,
            documentType: item.compose.document_type,
            composeId: item.compose.id,
            createdDate: item.compose?.created_date,
            documentSubType: item.compose.document_sub_type,
            operationType: item.action,
            statusAbs: item.status,
            type: item.type,
            iabsId: item.iabs_id
          }))
          
          this.iabsActionListTotalCount = response.data?.count
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.iabsActionListLoading = false
        }
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
      async actionGetUsersList(params, resetList= true) {
        try {
          if(resetList){
            this.usersListLoading = true
          } 
          const response = await fetchGetUsersList(params)
          if(resetList){
            this.usersList = response.data.results
          } else {
            this.usersList = [...this.usersList, ...response.data.results]
          }
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.usersListLoading = false
        }
      },
      async actionGetIabsRequestCalls(params) {
        try {
          this.iabsRequestCallsLoading = true
          const response = await getIabsRequestCalls(params)
          this.iabsRequestCalls = response.data.results
          this.iabsRequestCallsTotalCount = response.data.count
          return response
        } catch (error) {
          console.log(error)
        } finally {
          this.iabsRequestCallsLoading = false
        }
      },
      resetHeaders() {
        this.headers = this.headers.map(header => ({
          ...header,
          active: true
        }))
      }
    }
})
