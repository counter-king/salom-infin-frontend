// Core
import { defineStore } from "pinia"
// Store
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
import { useBoxesCommonStore } from '../../Boxes/stores/common.store'
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentById,
  fetchUpdateDocument,
  fetchGetTree, fetchGetDocumentList
} from "../services/docflow.service"
// Utils
import { clearModel, setValuesToKeys } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, JOURNAL } from '@/enums'
export const useDocFlowStore = defineStore("docFlowStore", {
  state: () => ({
    routes: {
      title: "Регистрация",
      icon: "ClipboardUpIcon",
      link: "RegistrationIndex",
      children: []
    },
    headers: [
      {
        header: "priority",
        field: "priority",
        detail: {
          component: 'priority-chip',
          colClass: '',
        },
        active: true
      },
      {
        header: "naming",
        field: "title",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "document-type",
        field: "document_type",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "deliver-type",
        field: "delivery_type",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "description",
        field: "description",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "magazine",
        field: "journal",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "language-document",
        field: "language",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "number-sheets",
        field: "number_of_papers",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "outgoing-date",
        field: "outgoing_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "outgoing-number",
        field: "outgoing_number",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "reg-number",
        field: "register_number",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "reg-date",
        field: "register_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "reviewers",
        field: "reviewers",
        detail: {
          component: 'base-avatar-group',
          colClass: '',
        },
        active: true
      },
      {
        header: "status",
        field: "status",
        detail: {
          component: 'base-status',
          colClass: '',
        },
        active: true
      },
      {
        header: "correspondent",
        field: "correspondent",
        detail: {
          component: null,
          colClass: '',
        },
        active: true
      },
      {
        header: "created-date",
        field: "created_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
      {
        header: "modified-date",
        field: "modified_date",
        detail: {
          component: null,
          colClass: '',
        },
        active: false
      },
    ],
    list: [],
    listLoading: false,
    detailModel: {
      code: null,
      content_type: 6,
      correspondent: null,
      created_by: null,
      created_date: null,
      delivery_type: null,
      description: null,
      document_type: null,
      files: [],
      __files: [],
      // TODO: Временно 1 для создания документа (Входящий)
      grif: 1,
      id: null,
      journal: JOURNAL.INCOMING,
      language: null,
      modified_date: null,
      number_of_papers: null,
      outgoing_date: null,
      outgoing_number: null,
      priority: null,
      register_date: null,
      register_number: null,
      reviewers: [],
      __reviewers: [],
      status: null,
      title: null,
      __copy_prototype: null
    },
    createDocumentModel: {
      code: null,
      content_type: 6,
      correspondent: null,
      created_by: null,
      created_date: null,
      delivery_type: null,
      description: null,
      document_type: null,
      files: [],
      __files: [],
      // TODO: Временно 1 для создания документа (Входящий)
      grif: 1,
      id: null,
      journal: JOURNAL.INCOMING,
      language: null,
      modified_date: null,
      number_of_papers: null,
      outgoing_date: null,
      outgoing_number: null,
      priority: null,
      register_date: null,
      register_number: null,
      reviewers: [],
      __reviewers: [],
      status: null,
      title: null
    },
    tree: null,
    documentMenuModal: false,
    documentMenuType: {
      name: 'Incoming',
      journalId: JOURNAL.INCOMING
    },
    filterState: {
      page: 1,
      page_size: 3
    },
    totalCount: 0
  }),
  actions: {
    /**
    * @param { Object } params Журнал id
    * Получить список
    * */
    async actionGetList(params) {
      const collectStore = useCollectRequestsStore()

      this.listLoading = true
      let { data } = await fetchGetDocumentList(params)

      this.list = data.results
      this.listLoading = false
      this.totalCount = data.count
      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionGetList',
        fn: this.actionGetList,
        params
      })
    },
    /**
     * Создает новый документ
     * */
    async actionCreateDocument(payload) {
      try {
        await fetchCreateDocument(payload)
        await clearModel(payload)
        dispatchNotify('Документ создан', 'Документ создан', COLOR_TYPES.SUCCESS)
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка создание документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /*
    * Выбираем первое резолюцию из списка в дереве
    * */
    async actionSetActiveResolution() {
      const boxesStore = useBoxesCommonStore()

      if(this.tree.reviewers?.length && this.tree.reviewers[0]?.assignments?.length) {
        const resolution = this.tree.reviewers[0]?.assignments[0]

        await boxesStore.actionSetActiveResolution({
          signed: resolution.is_verified,
          receipt_date: resolution.receipt_date,
          deadline: resolution.deadline,
          content: resolution.content,
          assignees: resolution.assignees,
          reviewer: resolution.user
        })
      }
      else {
        await boxesStore.actionSetActiveResolution({
          signed: false,
          receipt_date: null,
          deadline: null,
          content: null,
          assignees: [],
          reviewer: null
        })
      }
    },
    /**
     * Получить документ по id
     * */
    async actionGetDocumentById({ id }) {
      const collectStore = useCollectRequestsStore()
      let { data } = await fetchGetDocumentById(id)

      this.detailModel.__copy_prototype = data
      setValuesToKeys(this.detailModel, data)
      // Если есть юзеры на рассмотрение
      if(data.reviewers && data.reviewers.length) {
        this.detailModel.__reviewers = data.reviewers.map(item => {
          return {
            ...item,
            __userId: item.user.id
          }
        })
      }
      // Если есть файлы
      if(data.files && data.files.length) {
        this.detailModel.__files = data.files.map(file => file.file)
      }

      // Добавляем запрос в коллекцию
      collectStore.actionAddRequests({
        id: 'actionGetDocumentById',
        fn: this.actionGetDocumentById,
        params: { id }
      })
    },
    /**
     * Изменить документ по id
     * */
    async actionUpdateDocument() {
      let model = {
        ...this.detailModel,
        reviewers: this.detailModel.__reviewers.length
          ? this.detailModel.__reviewers.map(item => {
          if(item.__userId) {
            return {
              id: item.id,
              user: item.__userId,
              document: item.document
            }
          }
          else {
            return {
              user: item.id,
              document: this.detailModel.id
            }
          }
        })
          : [],
        files: this.detailModel.__files
          ? this.detailModel.__files.map(file => ({ file: file.id }))
          : []
      }

      try {
        await fetchUpdateDocument({ id: this.detailModel.id, body: model })
        await this.actionGetDocumentById({ id: this.detailModel.id })
        await this.actionGetTree(this.detailModel.id)
        dispatchNotify('Документ изменен', 'Документ изменен', COLOR_TYPES.SUCCESS)
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка изменение документа', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    },
    /**
     * Получить дерево
     * */
    async actionGetTree(payload) {
      let { data } = await fetchGetTree(payload)
      this.tree = data
    },
    /*
    *
    * */
    actionToggleModalCreateDocument(payload) {
      this.documentMenuModal = payload
    },
    /*
    * Загрузить форму для создания документа
    * */
    actionLoadFormCreateDocument(payload) {
      switch(payload.journalId) {
        case JOURNAL.INCOMING: // Входящий
          this.documentMenuType = {
            name: 'Incoming',
            journalId: JOURNAL.INCOMING
          }
          break
        case JOURNAL.INNER: // Внутренние
          this.documentMenuType = {
            name: 'Inner',
            journalId: JOURNAL.INNER
          }
          break
        case JOURNAL.OUTGOING: // Исходящие
          this.documentMenuType = {
            name: 'Outgoing',
            journalId: JOURNAL.OUTGOING
          }
          break
        case JOURNAL.APPEALS: // Обращение
          this.documentMenuType = {
            name: 'Appeal',
            journalId: JOURNAL.APPEALS
          }
          break
        case JOURNAL.ORDERS_PROTOCOLS: // Приказы и распоряжения
          this.documentMenuType = {
            name: 'OrderInstruction',
            journalId: JOURNAL.ORDERS_PROTOCOLS
          }
          break
        default: // Заявления
          this.documentMenuType = {
            name: 'Statement',
            journalId: JOURNAL.APPLICATION
          }
      }
    },
    /*
    * Сбросит все колонки в изначальное состояние
    * */
    resetHeaders() {
      this.headers = [
        {
          header: "priority",
          field: "priority",
          detail: {
            component: 'priority-chip',
            colClass: '',
          },
          active: true
        },
        {
          header: "naming",
          field: "title",
          detail: {
            component: null,
            colClass: '',
          },
          active: true
        },
        {
          header: "document-type",
          field: "document_type",
          detail: {
            component: null,
            colClass: '',
          },
          active: true
        },
        {
          header: "deliver-type",
          field: "delivery_type",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "description",
          field: "description",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "magazine",
          field: "journal",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "language-document",
          field: "language",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "number-sheets",
          field: "number_of_papers",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "outgoing-date",
          field: "outgoing_date",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "outgoing-number",
          field: "outgoing_number",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "reg-number",
          field: "register_number",
          detail: {
            component: null,
            colClass: '',
          },
          active: true
        },
        {
          header: "reg-date",
          field: "register_date",
          detail: {
            component: null,
            colClass: '',
          },
          active: true
        },
        {
          header: "reviewers",
          field: "reviewers",
          detail: {
            component: 'base-avatar-group',
            colClass: '',
          },
          active: true
        },
        {
          header: "status",
          field: "status",
          detail: {
            component: 'base-status',
            colClass: '',
          },
          active: true
        },
        {
          header: "correspondent",
          field: "correspondent",
          detail: {
            component: null,
            colClass: '',
          },
          active: true
        },
        {
          header: "created-date",
          field: "created_date",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
        {
          header: "modified-date",
          field: "modified_date",
          detail: {
            component: null,
            colClass: '',
          },
          active: false
        },
      ]
    }
  }
})
