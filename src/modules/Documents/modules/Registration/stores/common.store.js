import { defineStore } from "pinia"
import { fetchCreateDocument, fetchGetDocumentById, fetchUpdateDocument, fetchGetTree } from "../services/common.service"

export const useDocflowRegistrationStore = defineStore("docflowRegistrationStore", {
  state: () => ({
    tree: null
  }),
  actions: {
    /**
     * Создает новый документ
     * */
    async actionCreateDocument(payload) {
      await fetchCreateDocument(payload).then(({ data }) => {
        console.log(data);
      })
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
