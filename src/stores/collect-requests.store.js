// Core
import { defineStore } from 'pinia'
export const useCollectRequestsStore = defineStore("collect-requests", {
  state: () => ({
    requests: []
  }),
  actions: {
    actionAddRequests(payload) {
      // Если запрос уже есть в списке не добавляем
      if(this.requests.find(request => request.id === payload.id)) {
        return
      }

      this.requests.push({
        ...payload,
        date: 123456
      })
    },
    /**
    * Заново отправляем все запросы из
    * коллекции после изменение языка
    * */
    async actionResendRequests() {
      for (const request of this.requests) {
        await request.fn(request.params)
      }
    }
  }
})
