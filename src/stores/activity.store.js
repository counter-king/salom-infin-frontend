// Core
import { defineStore } from "pinia"
// Service
import { fetchActivityList } from "@/services/activity.service"
export const useActivityStore = defineStore("activity", {
  state: () => ({
    activityList: [],
    column: [
      {
        type: "selection",
        minWidth: 55,
        active: true
      },
      {
        title: "Действие",
        key: "action",
        active: true
      },
      {
        title: "Дата",
        key: "created_date",
        active: true
      },
      {
        title: "Описания",
        key: "description.description",
        active: true,
        ellipsis: true,
      },
      {
        title: "Исходное значение",
        key: "old_value",
        active: true,
        ellipsis: true,
      },
      {
        title: "Новое значение",
        key: "new_value",
        active: true,
        ellipsis: true,
      },
      {
        title: "IP адрес",
        key: "ip_addr",
        active: true
      }
    ]
  }),
  actions: {
    /**
     * Получить список логов
     * */
    async actionActivityList(payload) {
      let { data } = await fetchActivityList({
        object_id: payload.object_id,
        content_type: payload.content_type
      })
      this.activityList = data.results
    }
  }
})

