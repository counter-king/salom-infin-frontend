<script setup>
// Core
import { computed } from 'vue'
// Components
import { PriorityChip, StatusChip } from '@/components/Chips'
// Utils
import { combineKeys } from '@/utils'
import { isDate, isDateHour, formatDate, formatDateHour } from '@/utils/formatDate'
// Macros
const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  data: {
    type: [Object, Array]
  }
})
// Computed
const value = computed(
  () => Array.isArray(props.data)
    ? props.data
    : combineKeys(props.headers, props.data)
)
</script>

<template>
  <base-row>
    <template v-for="item in value">
      <base-col :col-class="['w-1/2', item.detail.colClass]">
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
            {{
              isDate(item.field)
                ? formatDate(item.field)
                : isDateHour(item.field)
                  ? formatDateHour(item.field)
                  : item.field
            }}
          </span>
        </template>
      </base-col>
    </template>
  </base-row>
</template>
