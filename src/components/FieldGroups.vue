<script setup>
// Core
import { computed } from 'vue'
// Components
import { PriorityChip, StatusChip } from '@/components/Chips'
// Utils
import { combineKeys } from '@/utils'
import { isDate, formatDate } from '@/utils/formatDate'
// Macros
const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  data: {
    type: Object,
    default: () => {}
  }
})
// Computed
const value = computed(() => combineKeys(props.headers, props.data))
</script>

<template>
  <base-row>
    <template v-for="item in value">
      <base-col col-class="w-1/3">
        <base-label :label="item.header" />

        <template v-if="item.detail.component">
          <template v-if="item.detail.component === 'priority-chip'">
            <priority-chip :id="item.field?.id" text-class="text-base font-semibold text-primary-900" />
          </template>

          <template v-if="item.detail.component === 'base-status'">
            <status-chip :status="item.field" />
          </template>

          <template v-if="item.detail.component === 'base-avatar-group'">
            <base-avatar-group :items="item.field" />
          </template>
        </template>

        <template v-if="item.field?.hasOwnProperty('name') && !item.detail.component">
          <span class="text-base font-semibold text-primary-900">{{ item.field?.name }}</span>
        </template>

        <template v-if="!item.field?.hasOwnProperty('name') && !item.detail.component">
          <span class="text-base font-semibold text-primary-900">
            {{ isDate(item.field) ? formatDate(item.field) : item.field }}
          </span>
        </template>
      </base-col>
    </template>
  </base-row>

  <div class="flex items-center gap-2 mt-5">
    <slot name="preview-actions"></slot>
  </div>
</template>
