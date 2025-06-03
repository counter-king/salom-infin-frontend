<script setup>
// Core
import {reactive, ref} from "vue"
// Components
import { CustomTabs } from "@/components/Tabs"
import { BusinessTripTemplate, DecreeTemplate } from "@/components/Templates"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"

// Props
const props = defineProps({
  composeModel: {
    type: Object,
    default:() => {}
  },
  preview: {
    type: Boolean,
    default: false
  }
})

// Composable
const SDStore = useSDStore()

// Reactive
const tabs = ref([
  {
    id: 1,
    label: 'notice',
    slot: 'notice',
    active: true
  },
  {
    id: 2,
    label: 'decree',
    slot: 'decree',
    active: false
  }
])
// Methods
const onItemClick = async (item) => {
  SDStore.actionCloseHistoryDetail()
  item.id === 1 ? SDStore.versionHistoryList = SDStore.tempVersionHistoryList : SDStore.versionHistoryList = SDStore.secondVersionHistoryList
  emit('emit:onItemClick', item)
}
// Emits
const emit = defineEmits(['emit:onItemClick'])
</script>

<template>
  <div class="multiple-templates-component bg-greyscale-50 pt-2">
    <custom-tabs
      :items="tabs"
      @emit:on-item-click="onItemClick"
    >
      <template #notice>
        <business-trip-template :compose-model="composeModel" :preview="preview" class="p-6" />
      </template>

      <template #decree>
        <decree-template
          :compose-model="{
            ...composeModel,
            content: composeModel.decree_content,
            type: 'decree',
            register_number: composeModel.decree_register_number,
            trip_notice_register_number: composeModel.register_number
          }"
         :preview="preview" class="p-6" />
      </template>
    </custom-tabs>
  </div>
</template>

<style scoped>

</style>
