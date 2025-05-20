<script setup>
// core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import DataTableModal from './DataTableModal.vue'
// stores
import { useInteractionABSStore } from '../stores';
// composibles
const interactionABSStore = useInteractionABSStore()
import { useModel } from 'vue'

// props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:dialogVisible'
])

const dialogVisible = useModel(props, 'dialogVisible')
</script>
<template>
  <base-dialog
    v-model="dialogVisible"
    max-width="max-w-[1638px]"
    :headerClasses="'px-6 py-6'"
    :contentClasses="'px-6 py-[6px]'"
    :footerClasses="'h-[84px]'"
  >
    <template #header>
      123
    </template>
    <template #content>
      <DataTableModal
        :headers="interactionABSStore.headers"
        :value="interactionABSStore.list"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="interactionABSStore.listLoading"
        :total-count="interactionABSStore.totalCount"
        :action-list="interactionABSStore.actionGetInteractionABSList"
        :pageSize="15"
        >
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
      </DataTableModal>
    </template>
    <template #footer>
      
    </template>
  </base-dialog>
</template>
  