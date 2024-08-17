// Core
import { defineStore } from 'pinia'
// Services
import {
  fetchCustomUpdate,
  fetchGetDocumentDetail,
  fetchGetDocumentList
} from "@/modules/Documents/modules/SendDocuments/services/index.service";
// Utils
import { withAsync } from "@/utils/withAsync";
import { dispatchNotify } from "@/utils/notify";
// Enums
import {COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"
import {ROUTE_SD_CREATE} from "@/modules/Documents/modules/SendDocuments/constants"

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
        document_type: COMPOSE_DOCUMENT_TYPES.INNER
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
        document_type: COMPOSE_DOCUMENT_TYPES.NOTICE
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
        document_type: COMPOSE_DOCUMENT_TYPES.APPLICATION
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
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER
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
      // // Распоряжения
      // {
      //   label: "decree",
      //   icon: "CheckCircleIcon",
      //   type: "decree",
      //   sub_type: "decree",
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
    filterState: {
      page: 1,
      page_size: 15
    },
    totalCount: 0,
    headers: [
      {
        header: "Тип письма",
        field: "document_sub_type",
        active: true
      },
      {
        header: "Дата создание",
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
        header: "Подписант",
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
        active: false
      }
    ],
    list: [],
    SEND_DOCUMENT_CREATE_MENU_LIST: [
      {
        id: 1,
        label: 'service-letter',
        icon: 'NotebookIcon',
        type: 'menu',
        hasRouterLink: true,
        active: true,
        routerLinkName: ROUTE_SD_CREATE,
        documentType: COMPOSE_DOCUMENT_TYPES.INNER,
        documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER,
        items: []
      },
      {
        id: 2,
        label: 'notice',
        icon: 'NotesIcon',
        type: 'menu',
        hasRouterLink: false,
        active: false,
        items: [
          {
            label: 'business-trip',
            type: 'submenu',
            hasRouterLink: true,
            routerLinkName: ROUTE_SD_CREATE,
            documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
            documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP
          }
        ],
      },
      {
        id: 3,
        label: 'application',
        icon: 'DocumentAddIcon',
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
          }
        ],
      },
      {
        id: 4,
        label: 'order',
        icon: 'DocumentMedicineIcon',
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
          }
        ],
      },
    ]
  }),
  actions: {
    resetHeaders() {
      this.headers = [
        {
          header: "№",
          field: "index",
          active: true
        },
        {
          header: "Тип письма",
          field: "document_sub_type",
          active: true
        },
        {
          header: "Дата создание",
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
          header: "Подписант",
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
          active: false
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
          document_type: COMPOSE_DOCUMENT_TYPES.INNER
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
          document_type: COMPOSE_DOCUMENT_TYPES.NOTICE
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
          document_type: COMPOSE_DOCUMENT_TYPES.APPLICATION
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
          document_type: COMPOSE_DOCUMENT_TYPES.ORDER
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
        // // Распоряжения
        // {
        //   label: "decree",
        //   icon: "CheckCircleIcon",
        //   type: "decree",
        //   sub_type: "decree",
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
      const { response, error } = await withAsync(fetchGetDocumentDetail, id);
      if (response){
        this.detailModel = response.data;
        return Promise.resolve(response);
      }
    },
    /** **/
    async actionCustomUpdate({ id, body }) {
      this.customUpdateLoading = true;
      const response = await fetchCustomUpdate({ id, body });
      if (response) {
        this.customUpdateLoading = false;
        dispatchNotify(null, 'Изменено!', COLOR_TYPES.SUCCESS);
        return Promise.resolve(response);
      } else {
        this.customUpdateLoading = false;
        dispatchNotify(null, 'Произошла ошибка!', COLOR_TYPES.ERROR);
        return Promise.reject();
      }
    }
  }
})
