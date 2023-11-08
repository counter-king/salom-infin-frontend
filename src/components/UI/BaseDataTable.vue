<script setup>
// Core
import { useI18n } from 'vue-i18n'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {computed} from "vue";
import {formatDateHour} from "../../utils/formatDate";
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  }
})

const valueComputed = computed(() => {
  return props.value.map((item, index) => {
    return {
      index: index + 1,
      ...item
    }
  })
})
</script>

<template>
  <DataTable
    :value="valueComputed"
    scrollable
    scrollHeight="700px"
    :pt="{
        table: { class: ['border-separate', 'border-spacing-y-0.5', 'mt-[-2px]'] },
        thead: { class: ['bg-white'] },
        bodyRow: { class: ['cursor-pointer'] }
    }"
  >
    <template
      v-for="header in headers"
      :key="header.field"
    >
      <Column
        :header="t(header.header)"
        :field="header.field"
        :pt="{
          headerCell: { class: ['bg-inherit', 'h-[56px]'] },
          headerContent: { class: ['text-sm', 'font-semibold', 'text-greyscale-500'] },
          bodyCell: { class: ['text-xs', 'py-0', 'h-[56px]'] }
        }"
      >
        <template #body="{ field, data }">
          <slot :name="field" :data="{ value: data[field], data }">
            <span v-if="['created_date', 'modified_date'].includes(field)" class="text-sm font-medium text-greyscale-500">{{ formatDateHour(data[field]) }}</span>
            <span v-else class="text-sm font-medium text-greyscale-500">{{ data[field] }}</span>
          </slot>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<style>
th:first-child, td:first-child {
  border-radius: 12px 0 0 12px!important;
}

th:last-child, td:last-child {
  border-radius: 0 12px 12px 0!important;
}
</style>
