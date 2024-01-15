// Core
import { defineStore } from "pinia"
// Store
import { useBoxesCommonStore } from '../../Boxes/stores/common.store'
// Services
import {
  fetchCreateDocument,
  fetchGetDocumentById,
  fetchUpdateDocument,
  fetchGetTree
} from "../services/docflow.service"
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
export const useDocFlowStore = defineStore("docFlowStore", {
  state: () => ({
    routes: {
      title: "Регистрация",
      icon: "ClipboardUpIcon",
      link: "RegistrationIndex",
      children: [
        // Входящие
        {
          title: "Входящие",
          icon: "ArrowRightDownIcon",
          link: "RegistrationIncomingIndex",
          children: []
        },
        // Внутренний
        {
          title: "Внутренний",
          icon: "ArrowDownIcon",
          link: "RegistrationInnerIndex",
          children: []
        },
        // Исходящие
        {
          title: "Исходящие",
          icon: "RoundAltArrowDownIcon",
          link: "RegistrationOutgoingIndex",
          children: []
        },
        // Обращения
        {
          title: "Обращения",
          icon: "DocumentTextIcon",
          link: "RegistrationAppealIndex",
          children: []
        },
        // Приказы и распоряжения
        {
          title: "Приказы и распоряжения",
          icon: "NotebookIcon",
          link: "RegistrationOrderInstructionIndex",
          children: []
        },
        // Заявления
        {
          title: "Заявления",
          icon: "NotesIcon",
          link: "RegistrationStatementIndex",
          children: []
        },
      ]
    },
    tree: null,
    documentMenuModal: false,
    documentMenuType: 'Incoming'
  }),
  actions: {
    /**
     * Создает новый документ
     * */
    async actionCreateDocument(payload) {
      try {
        let model = {
          ...payload,
          files: payload.__files.length ? payload.__files.map(file => ({ file: file.id })) : []
        }

        let { data } = await fetchCreateDocument(model)
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
    async actionGetDocumentById(payload) {
      let { data } = await fetchGetDocumentById(payload.id)

      return Promise.resolve(data)
    },
    /**
     * Изменить документ по id
     * */
    async actionUpdateDocument(payload) {
      await fetchUpdateDocument({ id: payload.id, body: payload.body })
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
      this.documentMenuType = payload
    }
  }
})
