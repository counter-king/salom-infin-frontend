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
  NotebookIcon,
  PostsCarouselVerticalIcon
} from '@/components/Icons'

export const useThemeStore = defineStore("theme", {
  state: () => ({
    header: [
      // Дашбоард
      {
        title: 'dashboard',
        icon: HomeAngle2Icon,
        link: 'DashboardIndex',
        children: [],
        count: null,
        name: 'dashboard',
        permission: 'dashboard'
      },
      // Календарь
      {
        title: 'calendar',
        icon: CalendarIcon,
        link: 'CalendarIndex',
        children: [],
        count: null,
        name: 'calendar',
        permission: 'calendar'
      },
      // Документ
      {
        title: 'eDocs',
        icon: FolderWithFilesIcon,
        link: 'DocumentsIndex',
        count: null,
        name: 'document',
        permission: 'e-docs'
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
        icon: ChatLineIcon,
        link: 'ChatIndex',
        children: [],
        count: null,
        name: 'chat',
        permission: 'hr'
      },

        // News
      {
        title: 'News',
        icon: PostsCarouselVerticalIcon,
        link: 'NewsIndex',
        children: [],
        count: null,
        name: 'news',
        permission: 'news'
      },
      // HR
      {
        title: 'HR',
        icon: UserCheckIcon,
        link: 'HRIndex',
        children: [],
        count: null,
        name: 'hr',
        permission: 'hr'
      },
      // Handbook
      {
        title: 'handbook',
        icon: NotebookIcon,
        link: 'HandbookIndex',
        children: [],
        count: null,
        name: 'handbook',
        permission: null
      },
      // Настройки
      // {
      //   title: 'Настройки',
      //   icon: SettingsIcon,
      //   link: 'SettingsIndex',
      //   children: [],
      //   count: null,
      //   name: 'settings',
      //   permission: 'settings'
      // },
    ]
  }),
  actions: {

  }
})
