<script setup>
// Core
import { ref, computed } from 'vue'
// Store
import { useCommonStore } from '@/stores/common'
import { useDocFlowStore } from '../stores/docflow.store'
// Components
import BaseDropdown from '@/components/UI/BaseDropdown.vue'
// Composable
const commonStore = useCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const select = ref(docFlowStore.documentMenuType.journalId)
// Computed
const menuList = computed(() => commonStore.journalsList.map(journal => {
  return {
    ...journal,
    label: journal.name
  }
}))
const menuActiveText = computed(() => menuList.value.find(menu => menu.code === select.value))
// Methods
const documentType = (journalCode) => {
	docFlowStore.actionLoadFormCreateDocument({ journalCode })
}
</script>

<template>
  <div class="min-w-[250px]">
    <span class="text-greyscale-400 font-medium text-xs mb-1">Журнал</span>

    <base-dropdown
      v-model="select"
      :options="menuList"
      option-label="label"
      option-value="code"
      root-class="bg-greyscale-90 !border-greyscale-200"
      class="!mb-0"
      @emit:change="documentType"
    >
      <template #value>
        <h1 class="text-base text-primary-900 font-semibold">{{ menuActiveText.label }}</h1>
      </template>
    </base-dropdown>
  </div>
</template>
