<script setup>
// Core
import { ref } from 'vue'
import Toolbar from 'primevue/toolbar'
// Store
import { useNavigation } from '@/stores/navigation.store'
import { onClickOutside } from '@vueuse/core'
// Components
import CreateActionDropdown from './CreateActionDropdown.vue'
import Search from './Search.vue'
import SettingDropdown from './SettingDropdown.vue'
import Notifications from './Notifications.vue'
import LanguageDropdown from './LanguageDropdown.vue'
import UserDropdown from './UserDropdown.vue'
// Composable
const navigationStore = useNavigation()
// Reactive
const menus = ref([
  // Дашбоард
  {
    title: "Дашбоард",
    icon: "HomeAngleIcon",
    link: "DashboardIndex",
    children: [],
    value: "dashboard"
  },
  // Календарь
  {
    title: "Календарь",
    icon: "CalendarIcon",
    link: "DashboardIndex",
    children: [],
    value: "calendar"
  },
  // Документ
  {
    title: "Документ",
    icon: "FolderWithFilesIcon",
    link: "DocumentsIndex",
    children: [
      {
        title: "Документ",
        prefix: true
      },
      // Ящики
      {
        title: "Ящики",
        icon: "InboxUnreadIcon",
        link: "BoxesIndex",
        children: [
          // Входящие
          {
            title: "Входящие",
            icon: "ArrowRightDownIcon",
            link: "IncomingIndex",
            children: []
          },
          // Исходящие
          // {
          //   title: "Исходящие",
          //   icon: "ArrowRightDownIcon",
          //   link: "OutgoingIndex",
          //   children: []
          // },
          // На рассмотрении
          {
            title: "На рассмотрении",
            icon: "TimeHistoryIcon",
            link: "ReviewIndex",
            children: []
          },
          // На подпись
          {
            title: "На подпись",
            icon: "PenIcon",
            link: "SignIndex",
            children: []
          },
          // На согласовании
          {
            title: "На согласовании",
            icon: "EyeIcon",
            link: "ApprovalIndex",
            children: []
          },
          // На контроль
          {
            title: "На контроль",
            icon: "CheckCircleIcon",
            link: "ControlIndex",
            children: []
          },
        ]
      },
      // Отправка документов
      {
        title: "Отправка документов",
        icon: "ArchiveUpIcon",
        link: "SendDocumentsIndex",
        children: []
      },
      // Регистрация
      {
        title: "Регистрация",
        icon: "ClipboardUpIcon",
        link: "RegistrationIndex",
        children: [
          // Входящие
          {
            title: "Входящие",
            icon: "ArrowRightDownIcon",
            link: "RegistrationIncomingIndex",
            children: []
          },
          // Внутренний
          {
            title: "Внутренний",
            icon: "ArrowDownIcon",
            link: "RegistrationInnerIndex",
            children: []
          },
          // Исходящие
          {
            title: "Исходящие",
            icon: "RoundAltArrowDownIcon",
            link: "RegistrationOutgoingIndex",
            children: []
          },
          // Обращения
          {
            title: "Обращения",
            icon: "DocumentTextIcon",
            link: "RegistrationAppealIndex",
            children: []
          },
          // Приказы и распоряжения
          {
            title: "Приказы и распоряжения",
            icon: "NotebookIcon",
            link: "RegistrationOrderInstructionIndex",
            children: []
          },
          // Заявления
          {
            title: "Заявления",
            icon: "NotesIcon",
            link: "RegistrationStatementIndex",
            children: []
          },
        ]
      },
    ],
    value: "documents"
  },
  // Kanban
  {
    title: "Kanban",
    icon: "ChatSquareIcon",
    link: "DashboardIndex",
    children: [],
    value: "kanban"
  },
  // Чат
  {
    title: "Чат",
    icon: "ChatLineIcon",
    link: "DashboardIndex",
    children: [],
    value: "chat"
  },
])
const modal = ref(true)
const modalRef = ref(null)
// Methods
const openSidebar = (menu) => {
  navigationStore.actionCurrentMenu(menu)
}
onClickOutside(
    modalRef,
    (event) => {
      console.log(event)
      modal.value = true
    },
  )
</script>

<template>
	<header class="app-toolbar-view">
		<toolbar
      :pt="{
        root: {
          class: ['py-5 px-10 bg-primary-dark border-none rounded-none']
        }
      }"
    >
      <template #start >
        <router-link to="/" class="flex items-center mr-6">
          <img src="/images/logo.svg" alt="Logo" />
          <img src="/images/logo-text.svg" alt="Logo text" class="ml-2" />
        </router-link>

        <template v-for="menu in menus" v-if="modal">
          <!-- Если нет подразделы -->
          <template v-if="menu.link">
            <router-link
              :to="{ name: menu.link }"
              class="header-link group flex items-center text-sm font-medium text-gray-1 py-[9px] pr-4 pl-[13px] rounded-full mr-3 transition-all duration-[400ms] hover:bg-primary-800 hover:text-white"
              @click="openSidebar(menu)"
            >
              <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-2 transition-all duration-[400ms] group-hover:text-white mr-2" />
              {{ menu.title }}
            </router-link>
          </template>

          <template v-else>
            <a @click="openSidebar(menu)" class="navigation-link group flex items-center text-sm font-medium text-gray-1 py-[9px] pr-4 pl-[13px] rounded-full cursor-pointer mr-3 transition hover:bg-primary-800 hover:text-white">
              <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-2 group-hover:text-white mr-2" />
              {{ menu.title }}
            </a>
          </template>
        </template>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <create-action-dropdown   v-if="modal"/>

          <div class="bg-greyscale-800 w-[1px] h-[28px]"  v-if="modal"></div>

          <div class="flex gap-2">
            <base-button
              v-if="modal"
              color="bg-greyscale-800 hover:bg-greyscale-900"
              border-color="border-greyscale-800"
              icon-left="MagniferIcon"
              only-icon
              rounded
              @click="modal = false"
            />

            <search v-else="modal" ref="modalRef"></search>

            <setting-dropdown></setting-dropdown>

            <notifications></notifications>

            <language-dropdown></language-dropdown>
          </div>

          <div class="bg-greyscale-800 w-[1px] h-[28px]"></div>

          <UserDropdown></UserDropdown>
        </div>
      </template>
    </toolbar>
	</header>

  <Teleport v-if="!modal" to="body">
    <div class="modal-layer fixed bottom-0 w-full transition-all duration-[400ms]"></div>
  </Teleport>
</template>

<style>
.header-link.router-link-active {
  background-color: var(--primary-800);
  color: #fff;
}

.header-link.router-link-active svg {
  color: #fff;
}
</style>
