// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchCustomUpdate,
  fetchGetDocumentDetail,
  fetchGetDocumentList, fetchGetLinkedDocumentsList, fetchVersionHistory
} from "@/modules/Documents/modules/SendDocuments/services/index.service"
import { fetchBlobFile } from "@/services/file.service"
// Utils
import { withAsync } from "@/utils/withAsync"
import { dispatchNotify } from "@/utils/notify"
// Enums
import {COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"
import {ROUTE_SD_CREATE} from "@/modules/Documents/modules/SendDocuments/constants"
import {fetchGetTree} from "@/modules/Documents/modules/Registration/services/docflow.service"
// Components
import {
  CheckCircleIcon,
  DocumentAddIcon,
  DocumentIcon,
  DocumentMedicineIcon,
  NotebookLinearIcon,
  NotesIcon
} from "@/components/Icons"

export const useSDStore = defineStore("sd-stores", {
  state: () => ({
    SD_TOOLBAR_MENU_LIST: [
      // Внутренний
      {
        label: "service-letter",
        icon: "NotebookIcon",
        type: "inner",
        sub_type: "inner",
        active: true,
        selected: true,
        disabled: true,
        document_type: COMPOSE_DOCUMENT_TYPES.INNER,
        permission: 'sending-documents-service-letter-list'
      },
      // Рапорт
      {
        label: "notice",
        icon: "NotesIcon",
        type: "notice",
        sub_type: "notice",
        active: false,
        selected: true,
        disabled: false,
        document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
        permission: 'sending-documents-notice-list'
      },
      // Заявление
      {
        label: "application",
        icon: "DocumentAddIcon",
        type: "application",
        sub_type: "application",
        active: false,
        selected: true,
        disabled: false,
        document_type: COMPOSE_DOCUMENT_TYPES.APPLICATION,
        permission: 'sending-documents-applications-list'
      },
      // 	Приказ
      {
        label: "order",
        icon: "DocumentMedicineIcon",
        type: "hr_rotation",
        sub_type: "hr_rotation",
        active: false,
        selected: true,
        disabled: false,
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
        permission: 'sending-documents-order-list'
      },
      // Распоряжения
      {
        label: "ordering",
        icon: "CheckCircleIcon",
        type: "decree",
        sub_type: "decree",
        active: false,
        selected: true,
        disabled: false,
        document_type: COMPOSE_DOCUMENT_TYPES.DECREE,
        permission: 'sending-documents-decree-list'
      },
      // Доверенность
      {
        label: "power-of-attorney",
        icon: "DocumentIcon",
        type: "power-of-attorney",
        sub_type: "power-of-attorney",
        active: false,
        selected: true,
        disabled: false,
        document_type: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
        permission: 'sending-documents-poa-list'
      },
      // // Заключение
      // {
      //   label: "summary",
      //   icon: "NotesPenIcon",
      //   type: "summary",
      //   sub_type: "summary",
      //   active: false,
      //   selected: false,
      //   disabled: false
      // },
      // // Исходящий
      // {
      //   label: "outgoing",
      //   icon: "RoundArrowDownIcon",
      //   type: "outgoing",
      //   sub_type: "outgoing",
      //   active: false,
      //   selected: true,
      //   disabled: false
      // },
      // // Протокол правления
      // {
      //   label: "board-protocol",
      //   icon: "NotebookIcon",
      //   type: "board_protocol",
      //   sub_type: "board_protocol",
      //   active: false,
      //   selected: true,
      //   disabled: false
      // },
      // // Протокол комитета
      // {
      //   label: "committee-protocol",
      //   icon: "NotesIcon",
      //   type: "committee_protocol",
      //   sub_type: "committee_protocol",
      //   active: false,
      //   selected: true,
      //   disabled: false
      // },
      // // Созданные приказы
      // {
      //   label: "hr-order",
      //   icon: "DocumentMedicineIcon",
      //   type: "hr_order",
      //   sub_type: "hr_order",
      //   active: false,
      //   selected: true,
      //   disabled: false
      // },
      // // В другие организации
      // {
      //   label: "organization-letter",
      //   icon: "BuildingsIcon",
      //   type: "organization_letter",
      //   sub_type: "organization_letter",
      //   active: false,
      //   selected: true,
      //   disabled: false
      // },
    ],
    documentList: [],
    detailModel: {},
    listLoading: false,
    detailLoading: false,
    customUpdateLoading: false,
    versionHistoryList: [],
    secondVersionHistoryList: [],
    tempVersionHistoryList: [],
    historyContent: "",
    historyShow: false,
    tree: null,
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    headers: [
      {
        header: "letter-type",
        field: "document_sub_type",
        active: true
      },
      {
        header: "created-date",
        field: "created_date",
        active: true
      },
      {
        header: "Дата изменения",
        field: "modified_date",
        active: true
      },
      {
        header: "Рег. номер",
        field: "register_number",
        active: true
      },
      {
        header: "signer",
        field: "signers",
        active: true
      },
      {
        header: "Состояние",
        field: "status",
        active: true
      },
      {
        header: "Действие",
        field: "action",
        active: true
      }
    ],
    list: [],
    SEND_DOCUMENT_CREATE_MENU_LIST: [
      {
        id: 1,
        label: 'service-letter',
        icon: NotebookLinearIcon,
        type: 'menu',
        hasRouterLink: false,
        active: true,
        items: [
          {
            label: 'service-memo',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.INNER,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER
          },
        ]
      },
      {
        id: 2,
        label: 'notice',
        icon: NotesIcon,
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'notice',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_NOTICE
          },
          // {
          //   label: 'business-trip',
          //   type: 'submenu',
          //   hasRouterLink: true,
          //   routerLinkName: ROUTE_SD_CREATE,
          //   documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
          //   documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP
          // },
          {
            label: 'business-trip-v2',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2
          },
          {
            label: 'business-trip-v2-foreign',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_FOREIGN
          },
          {
            label: 'notice-for-employment',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.NOTICE_FOR_EMPLOYMENT
          },
        ],
      },
      {
        id: 3,
        label: 'application',
        icon: DocumentAddIcon,
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'labor-leave',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE
          },
          {
            label: 'material-support',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.MATERIAL_SUPPORT
          },
          {
            label: 'educational-leave',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.EDUCATIONAL_LEAVE
          },
          {
            label: 'vacation-own-expense',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.VACATION_OWN_EXPENSE
          },
          {
            label: 'child-care-leave',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.CHILD_CARE_LEAVE
          },
          {
            label: 'application',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.APPLICATION
          },
          {
            label: 'explanation-letter',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.EXPLANATION_LETTER
          },
        ],
      },
      {
        id: 4,
        label: 'order',
        icon: DocumentMedicineIcon,
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'business-trip-order',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.ORDER,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER
          },
          {
            label: 'business-trip-order-local',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.ORDER,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER_LOCAL
          }
        ],
      },
      {
        id: 5,
        label: 'decree',
        icon: CheckCircleIcon,
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'business-trip-decree-local',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.DECREE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_LOCAL
          }
        ],
      },
      {
        id: 6,
        label: 'power-of-attorney',
        icon: DocumentIcon,
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'for-legal-services',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_FOR_LEGAL_SERVICES
          },
          {
            label: 'acting-manager',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_ACTING_FILIAL_MANAGER
          },
          {
            label: 'second-type-bsc-manager',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_SECOND_TYPE_BSC_MANAGER
          },
          {
            label: 'deputy-filial-manager',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER_BUSINESS
          },
          {
            label: 'deputy-filial-manager-retail',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER_RETAIL
          },
          {
            label: 'bxo-manager',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_MANAGER
          },
          {
            label: 'bxo-deputy-manager-business',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_DEPUTY_MANAGER_BUSINESS
          },
          {
            label: 'bxo-deputy-manager-retail',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_DEPUTY_MANAGER_RETAIL
          },
          {
            label: 'client-manager',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_CLIENT_MANAGER
          },
          {
            label: 'eimzo',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_ELECTRON_DIGITAL_SIGNATURE
          },
          {
            label: 'operative-group-head',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_OPERATIVE_GROUP_HEAD
          },
          {
            label: 'employer-representative',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_EMPLOYER_REPRESENTATIVE
          },
          {
            label: 'return-enforcement-document',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_RETURN_ENFORCEMENT_DOCUMENT
          },
          {
            label: 'mediation-agreement',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.POA_MEDIATION_AGREEMENT
          },
        ],
      },
    ]
  }),
  actions: {
    resetHeaders() {
      this.headers = [
        {
          header: "letter-type",
          field: "document_sub_type",
          active: true
        },
        {
          header: "created-date",
          field: "created_date",
          active: true
        },
        {
          header: "Дата изменения",
          field: "modified_date",
          active: true
        },
        {
          header: "Рег. номер",
          field: "register_number",
          active: true
        },
        {
          header: "signer",
          field: "signers",
          active: true
        },
        {
          header: "Состояние",
          field: "status",
          active: true
        },
        {
          header: "Действие",
          field: "action",
          active: true
        }
      ]
    },
    resetToolbarMenu() {
      this.SD_TOOLBAR_MENU_LIST = [
        // Внутренний
        {
          label: "service-letter",
          icon: "NotebookIcon",
          type: "inner",
          sub_type: "inner",
          active: true,
          selected: true,
          disabled: true,
          document_type: COMPOSE_DOCUMENT_TYPES.INNER,
          permission: 'sending-documents-service-letter-list'
        },
        // Рапорт
        {
          label: "notice",
          icon: "NotesIcon",
          type: "notice",
          sub_type: "notice",
          active: false,
          selected: true,
          disabled: false,
          document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
          permission: 'sending-documents-notice-list'
        },
        // Заявление
        {
          label: "application",
          icon: "DocumentAddIcon",
          type: "application",
          sub_type: "application",
          active: false,
          selected: true,
          disabled: false,
          document_type: COMPOSE_DOCUMENT_TYPES.APPLICATION,
          permission: 'sending-documents-applications-list'
        },
        // 	Приказ
        {
          label: "order",
          icon: "DocumentMedicineIcon",
          type: "hr_rotation",
          sub_type: "hr_rotation",
          active: false,
          selected: true,
          disabled: false,
          document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
          permission: 'sending-documents-order-list'
        },
        // Распоряжения
        {
          label: "ordering",
          icon: "CheckCircleIcon",
          type: "decree",
          sub_type: "decree",
          active: false,
          selected: true,
          disabled: false,
          document_type: COMPOSE_DOCUMENT_TYPES.DECREE,
          permission: 'sending-documents-decree-list'
        },
        // Доверенность
        {
          label: "power-of-attorney",
          icon: "DocumentIcon",
          type: "power-of-attorney",
          sub_type: "power-of-attorney",
          active: false,
          selected: true,
          disabled: false,
          document_type: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY,
          permission: 'sending-documents-poa-list'
        },
        // // Рапорт
        // {
        //   label: "notice",
        //   icon: "NotesIcon",
        //   type: "notice",
        //   sub_type: "notice",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
        // // Рапорт для ротации
        // {
        //   label: "hr-rotation",
        //   icon: "RefreshIcon",
        //   type: "hr_rotation",
        //   sub_type: "hr_rotation",
        //   active: false,
        //   selected: false,
        //   disabled: false
        // },
        // // Заключение
        // {
        //   label: "summary",
        //   icon: "NotesPenIcon",
        //   type: "summary",
        //   sub_type: "summary",
        //   active: false,
        //   selected: false,
        //   disabled: false
        // },
        // // Исходящий
        // {
        //   label: "outgoing",
        //   icon: "RoundArrowDownIcon",
        //   type: "outgoing",
        //   sub_type: "outgoing",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
        // // Протокол правления
        // {
        //   label: "board-protocol",
        //   icon: "NotebookIcon",
        //   type: "board_protocol",
        //   sub_type: "board_protocol",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
        // // Протокол комитета
        // {
        //   label: "committee-protocol",
        //   icon: "NotesIcon",
        //   type: "committee_protocol",
        //   sub_type: "committee_protocol",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
        // // Созданные приказы
        // {
        //   label: "hr-order",
        //   icon: "DocumentMedicineIcon",
        //   type: "hr_order",
        //   sub_type: "hr_order",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
        // // В другие организации
        // {
        //   label: "organization-letter",
        //   icon: "BuildingsIcon",
        //   type: "organization_letter",
        //   sub_type: "organization_letter",
        //   active: false,
        //   selected: true,
        //   disabled: false
        // },
      ]
    },
    async actionGetDocumentList(params){
      this.listLoading = true;
      const { data } = await fetchGetDocumentList(params);

      this.documentList = data.results;

      if (data.results && data.results.length){
        for (let i = 0; i < 30; i++) {
          this.list.push({
            ...data.results[0],
            id: data.results[0].id
          })
        }
      }
      this.totalCount = data.count;


      this.listLoading = false;

      return Promise.resolve(data);
    },
    /** **/
    async actionGetDocumentDetail(id){
      const { response, error } = await withAsync(fetchGetDocumentDetail, id)
      const res = await fetchGetLinkedDocumentsList(response.data.id)
      if (response && response.status === 200){
        if (response.data?.registered_document){
          let { data } = await fetchGetTree(response.data?.registered_document)
          this.tree = data
        }
        console.log(response)
        await this.actionVersionHistory(id, response?.data?.document_sub_type?.id === Number(COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2) ? res?.data?.to_composes[0]?.from_compose?.id : null)
        // let files = []
        // if (response.data.files.length) {
        //   for (const file of response.data.files) {
        //     const blobFile = await fetchBlobFile(file.id)
        //     files.push({
        //       ...file,
        //       ...blobFile
        //     })
        //   }
        // }

        this.detailModel = {
          ...response.data,
          decree_id: res?.data?.to_composes[0]?.from_compose?.id,
          decree_content: res?.data?.to_composes[0]?.from_compose?.content,
          decree_register_number: res?.data?.to_composes[0]?.from_compose?.register_number,
        }
        return Promise.resolve(response)
      }
    },
    /** **/
    async actionGetDocumentDetailForCustomUse(id){
      const { response, error } = await withAsync(fetchGetDocumentDetail, id)
      if (response && response.status === 200){
        return Promise.resolve(response)
      }
    },
    /** **/
    async actionCustomUpdate({ id, body }) {
      this.customUpdateLoading = true;
      const response = await fetchCustomUpdate({ id, body })
      if (response) {
        this.customUpdateLoading = false
        dispatchNotify(null, 'Изменено!', COLOR_TYPES.SUCCESS)
        return Promise.resolve(response)
      } else {
        this.customUpdateLoading = false
        dispatchNotify(null, 'Произошла ошибка!', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /** **/
    async actionVersionHistory(id, secondId = null) {
      this.versionHistoryList = []
      this.tempVersionHistoryList = []
      this.secondVersionHistoryList = []
      const response = await fetchVersionHistory(id)
      if (response.status === 200) {
        this.tempVersionHistoryList = response.data.map(item => ({ ...item, active: false }))
        this.versionHistoryList = this.tempVersionHistoryList
      }
      if (secondId) {
        const secondResponse = await fetchVersionHistory(secondId)
        if (secondResponse && secondResponse.status === 200) {
          this.secondVersionHistoryList = secondResponse.data.map(item => ({ ...item, active: false }))
        }
      }
    },
    /** **/
    actionCloseHistoryDetail() {
      this.historyShow = false
      this.tempVersionHistoryList.forEach(item => item.active = false)
      this.versionHistoryList.forEach(item => item.active = false)
      this.secondVersionHistoryList.forEach(item => item.active = false)
    }
  }
})
