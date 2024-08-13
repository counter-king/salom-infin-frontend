<script setup>
// Components
import {
  ResolutionChairmanTemplate,
  ResolutionDeputyChairmanTemplate,
  ResolutionDefaultTemplate
} from '@/components/Templates'
import { TreeUsers } from '@/components/Tree'
// Enums
import { ROLES } from '@/enums'
// Macros
const props = defineProps({
  resolution: {
    type: Object,
    default: () => {}
  },
  treeItems: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="resolution-view">
    <div class="h-[calc(100vh-240px)] overflow-y-auto p-6">
      <div class="shadow-block min-h-[400px] border-[0.094rem] border-greyscale-200 rounded-lg p-6">
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

      <div class="flex items-center gap-2 mt-5">
        <slot name="preview-actions"></slot>
      </div>

      <tree-users :tree-items="props.treeItems" />
    </div>
  </div>
</template>
