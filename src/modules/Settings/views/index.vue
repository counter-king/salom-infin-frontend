<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Stores
import { profileStore } from '../stores/profile/index.store'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
import {
  BellIcon,
  BoxMinimalisticIcon,
  BuildingsIcon,
  DocumentTextIcon,
  FolderWithFilesIcon,
  LaptopMinimalisticIcon,
  MouseIcon,
  SettingsMinimalisticIcon,
  CheckCircleIcon,
  UsersGroupTwoRoundedIcon,
  UserSpeakRoundedIcon
} from '@/components/Icons'
// Composable
const { locale } = useI18n()
const profile = profileStore()
// Reactive
const menus = ref([])
// Methods
const changeLanguage = () => {
  menus.value = [
    {
      title: 'Настройки',
      prefix: true
    },
    {
      icon: FolderWithFilesIcon,
      link: 'DocumentFlowIndex',
      title: 'Документооборот',
    },
    {
      icon: BuildingsIcon,
      link: 'CorrespondentsIndex',
      title: 'Корреспонденты',
    },
    {
      icon: BoxMinimalisticIcon,
      link: 'StructureIndex',
      title: 'Структура',
    },
    {
      icon: UsersGroupTwoRoundedIcon,
      link: 'UsersIndex',
      title: 'Пользователи',
    },
    {
      icon: UserSpeakRoundedIcon,
      link: 'RolesIndex',
      title: 'Роли',
    },
    {
      icon: CheckCircleIcon,
      link: 'PermissionsIndex',
      title: 'Права доступа',
    },
    {
      icon: DocumentTextIcon,
      link: 'ShortDescriptionsIndex',
      title: 'Краткое описание',
    },
    // profile.routes,
    // {
    //   icon: 'UserIcon',
    //   link: 'ProfileIndex',
    //   title: 'Профиль',
    // },
    {
      icon: LaptopMinimalisticIcon,
      link: 'DevicesIndex',
      title: 'Мои устройства',
    },
    {
      icon: BellIcon,
      link: 'NotificationsIndex',
      title: 'Уведомления',
    },
    {
      icon: MouseIcon,
      link: 'EquipmentsIndex',
      title: 'Техника и оборудования',
    },
    {
      icon: SettingsMinimalisticIcon,
      link: 'GeneralSettingsIndex',
      title: 'Общие настройки',
    }
  ];
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
});
</script>
<template>
  <div class="settings-view flex w-full">
    <the-sidebar :menus="menus" />

    <div class="flex-1 overflow-y-auto p-6">
      <router-view />
    </div>
  </div>
</template>
