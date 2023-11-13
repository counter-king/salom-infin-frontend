<script setup>
import { PriorityChip } from "@/components/Chips"
// Macros
const props = defineProps({
  previewDetail: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="layout-preview-view p-4">
    <base-row>
      <template v-for="item in previewDetail">
        <base-col col-class="w-1/3">
          <base-label :label="item.header" />

          <template v-if="item.detail.component">
            <template v-if="item.detail.component === 'priority-chip'">
              <priority-chip :id="item.field.id" />
            </template>

            <template v-if="item.detail.component === 'base-avatar-group'">
              <base-avatar-group :items="item.field" />
            </template>
          </template>

          <template v-if="item.field.hasOwnProperty('name') && !item.detail.component">
            <span class="text-base font-semibold text-primary-900">{{ item.field.name }}</span>
          </template>

          <template v-if="!item.field.hasOwnProperty('name') && !item.detail.component">
            <span class="text-base font-semibold text-primary-900">{{ item.field }}</span>
          </template>
        </base-col>
      </template>
    </base-row>

    <slot name="preview-actions"></slot>
  </div>
</template>

<style scoped>

</style>
