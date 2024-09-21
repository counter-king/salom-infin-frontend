<script setup>
// Components
import {
  UserRoundedBoldIcon,
  UserSpeakBoldIcon,
  CityBoldIcon,
  CallMedicineRoundedBoldIcon,
  BuildingsBoldIcon,
  HashtagCircleBoldIcon,
  UsersGroupTwoRoundedBoldIcon,
  BriefCase20SolidIcon,
  UserHandsBoldIcon,
  LetterBoldIcon
} from '@/components/Icons'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Composable
const authStore = useAuthStore()
// Non-reactive
const items = [
  {
    title: 'ФИО Сотрудника',
    description: authStore.currentUser?.full_name,
    icon: UserRoundedBoldIcon
  },
  {
    title: 'Должность',
    description: authStore.currentUser?.position?.name,
    icon: UserSpeakBoldIcon
  },
  {
    title: 'Филиал',
    description: authStore.currentUser?.company?.name,
    icon: CityBoldIcon
  },
  {
    title: 'IP-телефона',
    description: authStore.currentUser?.cisco,
    icon: CallMedicineRoundedBoldIcon
  },
  {
    title: 'Департамент',
    description: authStore.currentUser?.top_level_department?.name,
    icon: BuildingsBoldIcon
  },
  {
    title: 'Табелный номер',
    description: authStore.currentUser?.table_number ?? '-',
    icon: HashtagCircleBoldIcon
  },
  {
    title: 'Отдел',
    description: authStore.currentUser.department?.name ?? '-',
    icon: UsersGroupTwoRoundedBoldIcon
  },
  {
    title: 'Опыт работы',
    description: authStore.currentUser.begin_work_date ?? '-',
    icon: BriefCase20SolidIcon
  },
  {
    title: 'Управления',
    description: authStore.currentUser.parent_dept_name?.name ?? '-',
    icon: UserHandsBoldIcon
  },
  {
    title: 'Корп. почта',
    description: authStore.currentUser.email ?? '-',
    icon: LetterBoldIcon
  },
]
</script>
<template>
  <div class="worker-view px-4">
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <template v-for="item in items">
        <div class="group col-span-1 flex transition-colors hover:bg-primary-10 h-20 relative rounded-xl p-4 after:hover:bg-transparent after:content after:transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-greyscale-70">
          <div class="w-9 h-9">
            <base-iconify :icon="item.icon" class="!w-6 !h-6 transition-colors text-greyscale-400 group-hover:text-primary-500" />
          </div>
          <div class="flex-1">
            <h1 class="text-sm font-medium text-greyscale-500 mb-1">{{ item.title }}</h1>
            <p class="font-semibold text-greyscale-900">{{ item.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
