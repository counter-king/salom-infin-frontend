// Core
import { defineStore } from "pinia"
export const useThemeStore = defineStore("theme", {
  state: () => ({
    header: [
      // Дашбоард
      {
        title: 'Дашбоард',
        icon: 'solar:home-angle-2-outline',
        link: 'DashboardIndex',
        children: [],
        count: null,
        name: 'dashboard'
      },
      // Календарь
      {
        title: 'Календарь',
        icon: 'solar:calendar-outline',
        link: 'CalendarIndex',
        children: [],
        count: null,
        name: 'calendar'
      },
      // Документ
      {
        title: 'Документ',
        icon: 'solar:folder-with-files-outline',
        link: 'DocumentsIndex',
        count: null,
        name: 'document'
      },
      // Kanban
      // {
      //   title: 'Kanban',
      //   icon: 'ChatSquareIcon',
      //   link: 'KanbanIndex',
      //   children: [],
      //   count: null,
      //   name: 'kanban'
      // },
      // Чат
      {
        title: 'Чат',
        icon: 'solar:chat-line-outline',
        link: 'ChatIndex',
        children: [],
        count: null,
        name: 'chat'
      },
      // HR
      {
        title: 'HR',
        icon: 'solar:user-check-outline',
        link: 'HRIndex',
        children: [],
        count: null,
        name: 'hr'
      },
      // Настройки
      {
        title: 'Настройки',
        icon: 'solar:settings-outline',
        link: 'SettingsIndex',
        children: [],
        count: null,
        name: 'settings'
      },
    ]
  }),
  actions: {

  }
})
