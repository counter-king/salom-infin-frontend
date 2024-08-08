// Core
import { defineStore } from "pinia"
export const useThemeStore = defineStore("theme", {
  state: () => ({
    header: [
      // Дашбоард
      {
        title: 'Дашбоард',
        icon: 'HomeAngleIcon',
        link: 'DashboardIndex',
        children: [],
        count: null,
        name: 'dashboard'
      },
      // Календарь
      {
        title: 'Календарь',
        icon: 'CalendarIcon',
        link: 'CalendarIndex',
        children: [],
        count: null,
        name: 'calendar'
      },
      // Документ
      {
        title: 'Документ',
        icon: 'FolderWithFilesIcon',
        link: 'DocumentsIndex',
        count: null,
        name: 'document'
      },
      // Kanban
      {
        title: 'Kanban',
        icon: 'ChatSquareIcon',
        link: 'KanbanIndex',
        children: [],
        count: null,
        name: 'kanban'
      },
      // Чат
      {
        title: 'Чат',
        icon: 'ChatLineIcon',
        link: 'ChatIndex',
        children: [],
        count: null,
        name: 'chat'
      },
      // HR
      {
        title: 'HR',
        icon: 'UserCheckIcon',
        link: 'HRIndex',
        children: [],
        count: null,
        name: 'hr'
      },
      // Настройки
      {
        title: 'Настройки',
        icon: 'SettingsIcon',
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
