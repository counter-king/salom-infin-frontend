// Core
import { defineStore } from "pinia"
import { notify } from '@kyvg/vue3-notification'
// Services
import { fetchCreateDocument, fetchGetDocumentById, fetchUpdateDocument, fetchGetTree } from "../services/docflow.service"
// Utils
import { clearModel } from '@/utils'
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
        notify({
          title: "Документ создан",
          text: "Документ создан",
          type: 'success'
        })
        return Promise.resolve(data)
      }
      catch (error) {
        notify({
          title: "Ошибка",
          text: "Ошибка создание документа",
          type: 'error'
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
    }
  }
})
