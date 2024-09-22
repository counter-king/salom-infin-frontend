// Core
import { defineStore } from 'pinia'
// Components
import {
  HomeAngle2Icon,
  CalendarIcon,
  FolderWithFilesIcon,
  ChatLineIcon,
  UserCheckIcon,
  SettingsIcon,
  NotebookIcon
} from '@/components/Icons'

export const useThemeStore = defineStore("theme", {
  state: () => ({
    header: [
      // Дашбоард
      {
        title: 'Дашбоард',
        icon: HomeAngle2Icon,
        link: 'DashboardIndex',
        children: [],
        count: null,
        name: 'dashboard'
      },
      // Календарь
      {
        title: 'Календарь',
        icon: CalendarIcon,
        link: 'CalendarIndex',
        children: [],
        count: null,
        name: 'calendar'
      },
      // Документ
      {
        title: 'eDocs',
        icon: FolderWithFilesIcon,
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
      // {
      //   title: 'Чат',
      //   icon: ChatLineIcon,
      //   link: 'ChatIndex',
      //   children: [],
      //   count: null,
      //   name: 'chat'
      // },
      // HR
      {
        title: 'HR',
        icon: UserCheckIcon,
        link: 'HRIndex',
        children: [],
        count: null,
        name: 'hr'
      },
      // Handbook
      {
        title: 'Справочник',
        icon: NotebookIcon,
        link: 'HandbookIndex',
        children: [],
        count: null,
        name: 'handbook'
      },
      // Настройки
      // {
      //   title: 'Настройки',
      //   icon: SettingsIcon,
      //   link: 'SettingsIndex',
      //   children: [],
      //   count: null,
      //   name: 'settings'
      // },
    ]
  }),
  actions: {

  }
})
