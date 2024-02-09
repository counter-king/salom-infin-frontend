// Core
import { defineStore } from 'pinia'
// Services
import { fetchCreateEvent } from '../services/calendar.service'
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    eventSidebar: false,
    eventModel: {
      title: null,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
      priority: null,
      assigners: null,
      __assigners: [],
      organizers: null,
      __organizers: [],
      short_descriptions: null,
      files: [],
      __files: []
    },
  }),
  actions: {
    /**
     * Создает новое мероприятие
     * */
    async actionCreateEvent() {
      try {
        // await fetchCreateEvent(this.eventModel)
        // await clearModel(this.eventModel)
        dispatchNotify(null, 'Мероприятия создана', COLOR_TYPES.SUCCESS)
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка создание мероприятий', COLOR_TYPES.ERROR)
      }
    }
  }
})
