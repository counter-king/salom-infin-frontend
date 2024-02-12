// Core
import { defineStore } from 'pinia'
// Services
import { fetchEventList, fetchCreateEvent} from '../services/calendar.service'
// Utils
import { clearModel, isObject } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
import { EVENT_TYPES, ACTION_FORM_TYPES } from '../enums'
export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    eventSidebar: false,
    eventList: [],
    eventModel: {
      title: null,
      start_date: null,
      __start_time: null,
      end_date: null,
      __end_time: null,
      priority: null,
      participants: null,
      __participants: [],
      organizer: null,
      __organizer: null,
      descriptions: null,
      files: [],
      __files: [],
      type: EVENT_TYPES.EVENT
    },
    actionTypesMenuSelected: {
      name: ACTION_FORM_TYPES.EVENT
    }
  }),
  actions: {
    async actionGetList() {
      let { data } = await fetchEventList()
      this.eventList = data.results
    },
    /**
     * Создает новое мероприятие
     * */
    async actionCreateEvent(type) {
      try {
        let model = {
          ...this.eventModel,
          start_date: `${this.eventModel.start_date}T${this.eventModel.__start_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          end_date: `${this.eventModel.end_date}T${this.eventModel.__end_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          participants: type === EVENT_TYPES.EVENT
            ? this.eventModel.__participants.map(participant => ({ user: participant.id }))
            : [],
          organizer: type === EVENT_TYPES.EVENT
            ? this.eventModel.__organizer
            : null,
          files: type === EVENT_TYPES.EVENT
            ? this.eventModel.__files.map(file => file.id)
            : null,
          type
        }

        await fetchCreateEvent(model)
        await clearModel(this.eventModel)
        dispatchNotify(null, 'Мероприятия создана', COLOR_TYPES.SUCCESS)
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify('Ошибка', 'Ошибка создание мероприятий', COLOR_TYPES.ERROR)
        return Promise.reject()
      }
    }
  }
})
