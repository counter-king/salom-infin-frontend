<script setup>
// Core
import { computed } from 'vue'
// Components
import { FilePreview } from '@/components/Files'
import {
  ResolutionChairmanTemplate,
  ResolutionDeputyChairmanTemplate,
  ResolutionDefaultTemplate
} from '@/components/Templates'
// Enums
import { ROLES } from '@/enums'
// Macros
const props = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  },
  hasResolution: {
    type: Boolean,
    default: true
  },
  files: {
    type: Array,
    default: () => []
  }
})
// Computed
const filesList = computed(() => {
  return props.hasResolution
    ?
      [
        { title: 'Фишка Doclines', slot: 'resolution' },
        ...props.files.map(file => ({ ...file, title: file.name, slot: 'file' }))
      ]
    : props.files.map(file => ({ ...file, title: file.name, slot: 'file' }))
})
</script>

<template>
  <div class="file-tabs-view flex flex-col h-full">
    <base-tab-view
      :tab-view="filesList"
      scrollable
      truncate
      actions
    >
      <template #resolution="{ value }">
        <div class="h-[calc(100vh-303px)] overflow-y-auto px-8 py-5">
          <template v-if="ROLES.CHAIRMAN === props.resolution.reviewer?.role?.name">
            <resolution-chairman-template :resolution="props.resolution" />
          </template>

          <template v-else-if="ROLES.FIRST_DEPUTY_CHAIRMAN || ROLES.DEPUTY_CHAIRMAN === props.resolution.reviewer?.role?.name">
            <resolution-deputy-chairman-template :resolution="props.resolution" />
          </template>

          <template v-else>
            <resolution-default-template :resolution="props.resolution" />
          </template>
        </div>
      </template>

      <template #file="{ value }">
        <div class="h-[calc(100vh-303px)]">
          <template v-if="value">
            <file-preview :file="value" />
          </template>
        </div>
      </template>
    </base-tab-view>
  </div>
</template>

<style scoped>

</style>
