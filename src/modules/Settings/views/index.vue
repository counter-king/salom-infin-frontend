<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Stores
import { profileStore } from '../stores/profile/index.store'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue';
import {
  BellIcon,
  BoxMinimalisticIcon,
  BuildingsIcon,
  DocumentTextIcon,
  FolderWithFilesIcon,
  CheckListMinimalisticLinearIcon,
  SettingsMinimalisticIcon,
  CheckCircleIcon,
  UsersGroupTwoRoundedIcon,
  UserSpeakRoundedIcon, WidgetAddLinearIcon
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
      title: 'settings',
      prefix: true
    },
    {
      icon: FolderWithFilesIcon,
      link: 'DocumentFlowIndex',
      title: 'document-turnover',
      permission: 'settings-e-docs'
    },
    {
      icon: BuildingsIcon,
      link: 'CorrespondentsIndex',
      title: 'correspondents',
      permission: 'settings-correspondents'
    },
    {
      icon: BoxMinimalisticIcon,
      link: 'StructureIndex',
      title: 'structure',
      permission: 'settings-structure'
    },
    {
      icon: WidgetAddLinearIcon,
      link: 'DepartmentAssignment',
      title: 'department-assignment',
      permission: 'department-assignment'
    },
    {
      icon: CheckListMinimalisticLinearIcon,
      link: 'AssignExecutivesIndex',
      title: 'assign-executives',
      permission: 'assign-executives'
    },
    {
      icon: UsersGroupTwoRoundedIcon,
      link: 'UsersIndex',
      title: 'users',
      permission: 'settings-users'
    },
    {
      icon: UserSpeakRoundedIcon,
      link: 'RolesIndex',
      title: 'roles',
      permission: 'settings-roles-list'
    },
    {
      icon: UserSpeakRoundedIcon,
      link: 'RoleAssignmentIndex',
      title: 'role-assignment',
      permission: 'settings-roles-list'
    },
    {
      icon: CheckCircleIcon,
      link: 'PoliciesIndex',
      title: 'access-rights',
      permission: 'settings-project-permission-list'
    },
    // {
    //   icon: CheckCircleIcon,
    //   link: 'PermissionsIndex',
    //   title: 'access-rights',
    //   permission: 'settings-project-permission-list'
    // },
    {
      icon: DocumentTextIcon,
      link: 'ShortDescriptionsIndex',
      title: 'short-description',
      permission: 'settings-short-descriptions-list'
    },
    // profile.routes,
    // {
    //   icon: 'UserIcon',
    //   link: 'ProfileIndex',
    //   title: 'Профиль',
    // },
    // {
    //   icon: LaptopMinimalisticIcon,
    //   link: 'DevicesIndex',
    //   title: 'Мои устройства',
    // },
    {
      icon: BellIcon,
      link: 'NotificationsIndex',
      title: 'notifications',
    },
    // {
    //   icon: MouseIcon,
    //   link: 'EquipmentsIndex',
    //   title: 'Техника и оборудования',
    // },
    {
      icon: SettingsMinimalisticIcon,
      link: 'GeneralSettingsIndex',
      title: 'general-settings',
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

    <div class="flex flex-col flex-1 overflow-y-auto p-6 pb-2">
      <router-view />
      <div class="mt-auto">
        <the-footer/>
      </div>
    </div>
  </div>
</template>
