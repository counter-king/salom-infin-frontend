<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import axiosConfig from '@/services/axios.config'
import { CallMedicineRoundedBoldIcon, LetterBoldIcon, StarLinearIcon, StarBoldIcon } from '@/components/Icons'
import { UserStatusChip } from '@/components/Chips'

const toast = useToast()
const { t } = useI18n()

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

const itemId = ref(0)

const flatDeepItems = computed(() => props.isSearch ? props.value : collectUsersFromArray(props.value))

const addToFavourite = async (id) => {
  itemId.value = id
  try {
    await axiosConfig.post(`my-selected-contacts/`, { user: id })
    toast.add({ severity: 'success', summary: t('successfully-added'), life: 3000 })
  }
  catch (error) {

  }
  finally {
    setTimeout(() => {
      itemId.value = 0
    }, 500)
  }
}

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
      <div class="flex flex-col bg-white shadow-button rounded-[20px] overflow-hidden relative">
        <div class="flex flex-1 gap-4 p-5">
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
            <h1 class="font-semibold text-greyscale-900 mb-1">{{ item.full_name }}</h1>

            <user-status-chip
              :name="item.status.name"
              :status="{ id: item.status.code }"
              border
              circle
            />

            <h2 class="font-medium text-greyscale-500 line-clamp-1 mt-2">{{ item.position?.name }}</h2>
            <h2 class="font-medium text-greyscale-400 line-clamp-1 mt-1">{{ item.department?.name }}</h2>
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

        <button
          type="button"
          class="absolute top-4 right-4"
          @click="addToFavourite(item.id)"
        >
          <template v-if="itemId === item.id">
            <base-spinner root-classes="!w-6 !h-6" />
          </template>

          <template v-else>
            <template v-if="item.is_selected">
              <base-iconify :icon="StarBoldIcon" class="text-warning-500" />
            </template>

            <template v-else>
              <base-iconify :icon="StarLinearIcon" class="text-greyscale-300" />
            </template>
          </template>
        </button>
      </div>
    </template>
</div>
</template>

<style scoped>

</style>
