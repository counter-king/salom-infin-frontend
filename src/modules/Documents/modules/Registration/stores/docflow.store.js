// Core
import { defineStore } from "pinia"
// Services
import { fetchCreateDocument, fetchGetDocumentById, fetchUpdateDocument, fetchGetTree } from "../services/docflow.service"
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
export const useDocFlowStore = defineStore("docFlowStore", {
  state: () => ({
    tree: null
  }),
  actions: {
    /**
     * Создает новый документ
     * */
    async actionCreateDocument(payload) {
      try {
        let { data } = await fetchCreateDocument(payload)
        await clearModel(payload)
        dispatchNotify('Документ создан', 'Документ создан', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка создание документа', COLOR_TYPES.ERROR)
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
    }
  }
})
