// Core
import { defineStore } from 'pinia'
// Services
import { fetchEventList, fetchCreateEvent, fetchUpdateEvent, fetchDeleteEvent } from '../services/calendar.service'
// Utils
import { clearModel, isObject, setValuesToKeys } from '@/utils'
import { formatDateReverse, formatHour } from '@/utils/formatDate'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
import { EVENT_TYPES, ACTION_FORM_TYPES } from '../enums'

let model = {
  title: null,
  start_date: null,
  __start_time: null,
  end_date: null,
  __end_time: null,
  priority: 5, // medium
  participants: null,
  __participants: [],
  organizer: null,
  __organizer: null,
  description: null,
  attachments: [],
  __attachments: [],
  type: EVENT_TYPES.EVENT,
  source: null, // zoom | cisco
  link: null,
  notify_by: 'system', // system | email | sms
  __formatType: 'offline', // offline | online
  __tabActiveIndex: 0,
  __zoomLink: null,
  __ciscoLink: null
}

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    eventSidebar: false,
    eventList: [],
    eventListCopy: [],
    eventModel: Object.assign({}, model),
    updateEventModel: Object.assign({}, model),
    actionTypesMenuSelected: {
      name: ACTION_FORM_TYPES.EVENT
    },
    isEventClicked: false
  }),
  getters: {
    getOneEvent: state => (id) => {
      console.log(id)
      console.log(state)
      return id
    }
  },
  actions: {
    async actionGetList(params) {
      let { data } = await fetchEventList(params)
      this.eventList = data.results
      this.eventListCopy = [...this.eventList]
    },
    /**
     * Создает новое мероприятие
     * */
    async actionCreateEvent(type) {
      try {
        let model = {
          ...this.eventModel,
          start_date: `${formatDateReverse(this.eventModel.start_date)}T${this.eventModel.__start_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          end_date: `${formatDateReverse(this.eventModel.end_date)}T${this.eventModel.__end_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          participants: type === EVENT_TYPES.EVENT
            ? this.eventModel.__participants.map(participant => ({ user: participant.id }))
            : [],
          organizer: type === EVENT_TYPES.EVENT
            ? this.eventModel.__organizer
            : null,
          attachments: type === EVENT_TYPES.EVENT
            ? this.eventModel.__attachments.map(file => ({ id: file.id }))
            : null,
          type,
          link: this.eventModel.source === 'zoom' ? this.eventModel.__zoomLink : this.eventModel.__ciscoLink
        }

        let { data } = await fetchCreateEvent(model)
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Мероприятия создана' : 'Задача создана',
          COLOR_TYPES.SUCCESS
        )
        this.eventList.push(data)
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Ошибка создание мероприятий' : 'Ошибка создание задачи',
          COLOR_TYPES.ERROR
        )
        return Promise.reject()
      }
    },
    /**
    * Изменить мероприятие
    * */
    async actionChangeEvent(type) {
      try {
        let model = {
          ...this.updateEventModel,
          start_date: `${formatDateReverse(this.updateEventModel.start_date)}T${this.updateEventModel.__start_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          end_date: `${formatDateReverse(this.updateEventModel.end_date)}T${this.updateEventModel.__end_time}:00+05:00`, // 2023-09-28T09:35:00+05:00
          participants: type === EVENT_TYPES.EVENT
            ? this.updateEventModel.__participants.map(participant => {
              if(participant.__userId) {
                return {
                  id: participant.id,
                  user: participant.__userId,
                }
              }
              else {
                return {
                  user: participant.id
                }
              }
            })
            : [],
          organizer: type === EVENT_TYPES.EVENT
            ? this.updateEventModel.__organizer
            : null,
          attachments: type === EVENT_TYPES.EVENT
            ? this.updateEventModel.__attachments.map(file => ({ id: file.id }))
            : null,
          type,
          link: this.eventModel.source === 'zoom' ? this.eventModel.__zoomLink : this.eventModel.__ciscoLink
        }

        let { data } = await fetchUpdateEvent(model.id, model)
        this.eventList = this.eventList.map(event => {
          if(event.id === data.id) {
            return data
          } else {
            return event
          }
        })
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Мероприятия изменен' : 'Задача изменен',
          COLOR_TYPES.SUCCESS
        )
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Ошибка изменение мероприятий' : 'Ошибка изменение задачи',
          COLOR_TYPES.ERROR
        )
        return Promise.reject()
      }
    },
    /**
     * Удалить мероприятие
     * */
    async actionDeleteEvent(type) {
      try {
        await fetchDeleteEvent(this.updateEventModel.id)
        this.eventList = this.eventList.filter(event => event.id !== this.updateEventModel.id)
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Мероприятия удален' : 'Задача удален',
          COLOR_TYPES.SUCCESS
        )
        return Promise.resolve()
      }
      catch (error) {
        dispatchNotify(
          null,
          EVENT_TYPES.EVENT === type ? 'Ошибка удаление мероприятий' : 'Ошибка удаление задачи',
          COLOR_TYPES.ERROR
        )
        return Promise.reject()
      }
    },
    /**
     *
     * */
    actionSetEventModel(payload) {
      let model = {
        ...payload,
        start_date: payload.start_date.split("T")[0],
        end_date: payload.end_date.split("T")[0],
        __start_time: formatHour(payload.start_date),
        __end_time: formatHour(payload.end_date),
        __participants: payload.participants.map(item => {
          return {
            ...item,
            __userId: item.user.id
          }
        }),
        __organizer: payload.organizer,
        __formatType: payload.link ? 'online' : 'offline',
        __tabActiveIndex: payload.source === 'zoom' ? 0 : 1,
        __zoomLink: payload.source === 'zoom' ? payload.link : null,
        __ciscoLink: payload.source === 'cisco' ? payload.link : null
      }
      setValuesToKeys(this.updateEventModel, model)
    },
    /**
     *
     * */
    actionToggleEventClick(payload) {
      this.isEventClicked = payload
    },
    /**
     *
     * */
    filterEvent(type) {
      // this.eventList = this.eventListCopy.filter(event => ['event', 'task'].includes(event.type !== type))
    }
  }
})
