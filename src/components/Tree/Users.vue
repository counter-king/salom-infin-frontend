<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Store
import { useDocFlowStore } from '@/modules/Documents/modules/Registration/stores/docflow.store'
// Components
import { UserWithCollapse } from '@/components/Users'
// Composable
const { t } = useI18n()
const docflowStore = useDocFlowStore()
// Macros
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="bg-greyscale-50 rounded-lg p-6 mt-10">
    <div class="mb-6">
      <div class="flex items-center gap-2 text-sm mb-2">
        <h1 class="font-semibold text-primary-900">{{ t('reviewers') }}</h1>

        <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

        <h1 class="font-medium text-greyscale-500">21.08.2023, 15:47</h1>
      </div>

      <user-with-collapse />
    </div>
  </div>
</template>

<style scoped>

</style>
