<script setup>
import { computed } from 'vue'
import { CallMedicineRoundedBoldIcon, LetterBoldIcon } from '@/components/Icons'
import { UserStatusChip } from '@/components/Chips'

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  isSearch: {
    type: Boolean
  },
  totalCount: {
    type: Number
  }
})

const flatDeepItems = computed(() => collectUsersFromArray(props.value))

function collectUsersFromArray(departments) {
  let result = []

  for (const dep of departments) {
    result.push(...collectUsers(dep))
  }

  return result
}

function collectUsers(department) {
  let result = []

  if (Array.isArray(department.users)) {
    result.push(...department.users)
  }

  if (Array.isArray(department.children)) {
    for (const child of department.children) {
      result.push(...collectUsers(child))
    }
  }

  return result
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <template v-for="item in flatDeepItems" :key="item.id">
      <div class="bg-white shadow-button rounded-[20px] overflow-hidden">
        <div class="flex gap-4 p-5 pb-4">
          <div class="w-14 h-14">
            <base-avatar
              :label="item?.full_name"
              :color="item?.color ?? '#635AFF'"
              :image="item?.avatar?.url"
              :meta="item"
              shape="circle"
              detail-dialog
              avatar-classes="w-14 h-14"
            >
              <span class="text-xl font-medium uppercase text-white">{{ item?.full_name[0] }}</span>
            </base-avatar>
          </div>

          <div class="flex-1">
            <h1 class="font-semibold text-greyscale-900">{{ item.full_name }}</h1>
            <h2 class="font-medium text-greyscale-500">{{ item.position?.name }}</h2>
            <h2 class="font-medium text-greyscale-400 my-2">{{ item.department?.name }}</h2>

            <user-status-chip
              :name="item.status.name"
              :status="{ id: item.status.code }"
              border
              circle
            />
          </div>
        </div>

        <div class="flex items-center gap-6 bg-greyscale-50 border-t border-t-greyscale-100 py-3 px-6">
          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />
            <span class="font-medium text-greyscale-900 text-sm">{{ item.cisco }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="LetterBoldIcon" class="text-greyscale-400" />
            <span class="font-medium text-greyscale-900 text-sm">{{ item.email }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
